const { model, Schema } = require('mongoose');

const locationSchema = new Schema({
    
    // site:[{
    //     name:String
    // }],
    name:String,
    location:String
});

module.exports = model('Location', locationSchema);