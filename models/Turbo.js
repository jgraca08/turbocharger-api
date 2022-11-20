const mongoose = require("mongoose");

const TurboSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please add a turbo title"],
  },
  partNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please add a turbo part number"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  horsePower: {
    type: Number,
    required: [true, "Please add the horse power"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
    required: true 
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

// Reverse populate with virtuals
TurboSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'turbo',
  justOne: false
});

module.exports = mongoose.model("Turbo", TurboSchema);
