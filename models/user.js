const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    regiter_date:{
        type:Date,
        default: Date.now,
        required:true,
    },
});

module.exports = User = mongoose.model('user', UserSchema)