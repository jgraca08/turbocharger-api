const mongoose = require('mongoose');
const slugify = require('slugify');

const BrandSchema = new mongoose.Schema({
    
    slug: String,
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: [true, "This name already exists. Please choose a another name."],
        maxlength: [30, "Name can not be more than 30 characters"],
      }, 
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create brand slug from the name
BrandSchema.pre('save', function(next) {
    console.log('slugify',this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
  });

// Cascade delete turbos when a brand is deleted
BrandSchema.pre('remove', async function(next) {
  console.log(`Turbos being removed from brand ${this._id}`);
  await this.model('Turbo').deleteMany({ brand: this._id });
  next();
});

// Reverse populate with virtuals
BrandSchema.virtual('turbos', {
  ref: 'Turbo',
  localField: '_id',
  foreignField: 'brand',
  justOne: false
});

module.exports = mongoose.model('Brand',BrandSchema);