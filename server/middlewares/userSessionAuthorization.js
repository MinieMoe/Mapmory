//IMPORTS
const googleAuth = require('../googleAuth/googleAuthentication')

/**
 * @description authorization middleware to check if the user is logged in to keep track of user log-in session
 * NOTE: should this be used for other purposes like checking if the user is authorized to access a resource???
 */

const requireLogin = async (req, res, next) => {
    if (!req.cookies.jwt){
        res.status(401).json({
            status:'error',
            message: 'Unauthorized'
        })
    }
    console.log('cookies from usersession ', req.cookies)
    const token = req.cookies.jwt
    console.log('from usersession ', token)
    // User is logged in, call next() to continue processing the request
    try {
        const decodedToken = await googleAuth.getVerifiedAndDecodedOAuthJWTGoogle(token)
        //NOTE: return user info in the request body???
        next()
    }catch (error){
        res.status(401).json({
            status:'error',
            message:'Unauthorized'
        })
    }
}

module.exports = { requireLogin }