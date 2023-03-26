/****Imports****/
const express = require('express')
const cors = require('cors')
const googleAuth = require('./googleAuth/googleAuthentication')

const port = 4000
const app = express()
app.use(express.json())
app.use(cors())

/****Managing endpoints****/

app.get('/test', (req, res) => {
    res.send('It works asshole')
})

//receiving google id token from front end...
app.post('/api/login', async (req,res) => {
    const {credential} = req.body
  
    // decrypt the id token as base64-encoded JWT and verify the token
    try {
        const decodedToken = await googleAuth.getVerifiedAndDecodedOAuthJWTGoogle(credential)
        console.log(decodedToken)
        
        //extract user info (name, picture, email, etc.) from id token to be store in MongoDB???

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


app.listen(port, function () {
    console.log(`Mapmory is listening on port ${port}...`)
})
