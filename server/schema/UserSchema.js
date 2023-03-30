const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: String,
    email: String,
    name: String,
    picture: String,
    given_name: String,
    family_name: String,
    iat: Number,
    exp: Number,
})

module.exports = mongoose.model('User', UserSchema);