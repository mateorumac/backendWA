const mongoose  = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    description :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    rating :{
        type: mongoose.SchemaTypes.Number,
        require: true
    },
    userEmail:{
        type: mongoose.SchemaTypes.String,
        require: false
    },
    createdAt:{
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: new Date()
    },


})
module.exports =  mongoose.model('reviews', ReviewSchema);