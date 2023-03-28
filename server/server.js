/****Imports****/
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const googleAuth = require('./googleAuth/googleAuthentication')
const { requireLogin } = require('./middlewares/userSessionAuthorization')

const port = 4000
const url = process.env.DATABASE_URL
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

/****Middlewares****/
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())


//CONNECT THE MONGODB USING THE MONGOOSE
mongoose.set('strictQuery', false)
mongoose.connect(url,(err) => {
    if(err){
        console.log("err", err)
    }else{
        console.log("DB Connection established")
    }
})

/****Managing endpoints****/

// Receiving google id token from front end...
app.post('/api/login', async (req,res) => {
    const {credential} = req.body
  
    // Decrypt the id token as base64-encoded JWT and verify the token
    try {
        const decodedToken = await googleAuth.getVerifiedAndDecodedOAuthJWTGoogle(credential)
        console.log(decodedToken)        

        // Extract user info (name, picture, email, etc.) from id token to be store in MongoDB???
        
        // Store userID in cookies to keep track of user sign-in status - cookie session last 59 minutes or less???
        res.cookie('jwt', credential, { maxAge: 3540000, httpOnly:true})

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
        .clearCookie('jwt')
        .status(200)
        .json({
            status:'success',
            message: 'Successfully logged out!'
        })
})




app.listen(port, function () {
    console.log(`Mapmory is listening on port ${port}...`)
})
