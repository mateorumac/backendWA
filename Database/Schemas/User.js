const mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    name :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    lname :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    email :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    password :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
      },
    createdAt:{
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: new Date()
    },


})
module.exports =  mongoose.model('users', UserSchema);