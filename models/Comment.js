const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
      type: String,
      minLength:[5,"Comment must have 5 characters min."],
      maxLength:[300,"Comment must have 300 characters max."],
      required: [true, "Please add a comment"],
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
  
  module.exports = mongoose.model("Comment", CommentSchema);
  