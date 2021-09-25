const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
    category:String 
});

module.exports = model('Category', categorySchema);