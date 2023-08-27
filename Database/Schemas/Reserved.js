const mongoose  = require("mongoose");

const ReservedSchema = new mongoose.Schema({
    serviceType :{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    reservationDate :{
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    phoneNumber:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    comment: {
        type: mongoose.SchemaTypes.String,
        required: false 
    },
    createdAt:{
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: new Date()
    },



})
module.exports =  mongoose.model('reserved', ReservedSchema);