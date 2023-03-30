/****Imports****/
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const googleAuth = require('./googleAuth/googleAuthentication')
const { requireLogin } = require('./middlewares/userSessionAuthorization')
require('dotenv').config();


const port = 4000
const url = process.env.DATABASE_URL
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

/****Schemas****/
const User = require('./schema/UserSchema')


/****Middlewares****/
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

//CONNECT THE MONGODB USING THE MONGOOSE
mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB!')
}).catch(err => {
    console.log(err)
})

/****Managing endpoints****/

// Receiving google id token from front end...
app.post('/api/login', async (req,res) => {
    const {credential} = req.body
  
    // Decrypt the id token as base64-encoded JWT and verify the token
    try {
        const decodedToken = await googleAuth.getVerifiedAndDecodedOAuthJWTGoogle(credential)
        const payload = decodedToken.getPayload()
        const userId = payload['sub']
        console.log(decodedToken)
        
        //New user: extract user info (name, picture, email, etc.) from id token to be store in MongoDB???
        User.findById(userId).exec().then( user => {
            //user not found
            if (!user){
                user = new User({
                    _id: userId,
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture,
                    given_name: payload.given_name,
                    family_name: payload.family_name,
                    iat: payload.iat,
                    exp: payload.exp,
                })

                user.save().then(user =>{
                    console.log(`user with ${userId} is added to DB`)
                }).catch(error => {
                    res.status(500).json({
                        status:'error',
                        message:'Problem adding user to DB'
                    })
                })
            }

        })
        
        // Store userID in cookies to keep track of user sign-in status - cookie session last 59 minutes or less???
        res.cookie('userId', userId, { maxAge: 3540000, httpOnly:true})

        res.status(200).json({
            status:'success',
            message: 'Id token verified!'
            
        })
    } catch (error){
        res.status(500).json({
            status:'error',
            message:'Invalid Id token'
        })
    }

})

app.get('/api/logout', requireLogin, (req, res) => {
    res
        .clearCookie('userId')
        .status(200)
        .json({
            status:'success',
            message: 'Successfully logged out!'
        })
})




app.listen(port, function () {
    console.log(`Mapmory is listening on port ${port}...`)
})
