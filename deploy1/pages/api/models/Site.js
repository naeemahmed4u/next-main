const { model, Schema } = require('mongoose');

const siteSchema = new Schema({
    site:String,
    description: String,
    address: String,    
    city: String,
    province: String,
    postalCode: String,
    country: String    
});

module.exports = model('Site', siteSchema);
