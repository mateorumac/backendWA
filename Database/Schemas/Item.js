const mongoose  = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name :{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price :{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    originalPrice :{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    discountApplied: { 
        type: Boolean,
        default: false }

})
module.exports =  mongoose.model('item', ItemSchema);