//IMPORTS
const mongoose = require('mongoose')
const User = require('../schema/UserSchema')

/**
 * @description authorization middleware to check if the user is logged in to keep track of user log-in session
 * NOTE: should this be used for other purposes like checking if the user is authorized to access a resource???
 */

const requireLogin = async (req, res, next) => {
    if (!req.cookies.userId){
        res.status(401).json({
            status:'error',
            message: 'Unauthorized'
        })
    }
    const userId = req.cookies.userId
    // User is logged in, call next() to continue processing the request
    User.findById(userId).exec().then(user => {
        if (!user){
            res.status(401).json({
                status:'error',
                message:'Unauthorized'
            })
        }else{
            //NOTE: return user info in the request body???
            next()
        }
    })
}

module.exports = { requireLogin }