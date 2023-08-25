const mongoose  = require("mongoose");

const ReservedSchema = new mongoose.Schema({
    type :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    Date :{
        type: mongoose.SchemaTypes.Date,
        require: false
    },
    number:{
        type: mongoose.SchemaTypes.Number,
        require: false
    },
    comment :{
        type: mongoose.SchemaTypes.String,
        require: true
    },
    createdAt:{
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: new Date()
    },


})
module.exports =  mongoose.model('reserved', ReservedSchema);