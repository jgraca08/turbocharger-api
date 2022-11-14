const mongoose = require('mongoose');
const slugify = require('slugify');

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

// Create brand slug from the name
BrandSchema.pre('save', function(next) {
    console.log('slugify',this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
  });


module.exports = mongoose.model('Brand',BrandSchema);