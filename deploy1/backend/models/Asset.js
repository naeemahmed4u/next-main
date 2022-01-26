const { model, Schema } = require('mongoose');
const { boolean, number } = require('yup/lib/locale');

const assetSchema = new Schema({
    picture:String,
    description: String,
    assetTagID: String,
    purchasedFrom: String,
    purchaseDate: String,
    brand: String,
    cost: String,
    model: String,
    serialNo: String,
    site:String,
    category:String,
    location:String,
    department:String,
    depreciableAsset:String,
    depreciableCost:String,
    assetLife:String,
    salvageValue:String,
    depreciationMethod:String,
    dateAquired:String

});

module.exports = model('Asset', assetSchema);
