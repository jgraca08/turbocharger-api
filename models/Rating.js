const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    rating: {
      type: Number,
      min:[1,"Rating must be at least 1"],
      max:[5,"Rating must be max. 5"],
      required: [true, "Please add a rating"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true 
    },
  });
  
  module.exports = mongoose.model("Rating", RatingSchema);
  