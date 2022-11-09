const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        maxlength: [30, "Name can not be more than 30 characters"],
      }, 
    photo: {
        type: String,
        default: 'no-photo.jpg'
    }
});

module.exports = mongoose.model('Brand',BrandSchema);