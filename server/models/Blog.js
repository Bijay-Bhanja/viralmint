// models/Blog.js
const mongoose = require('mongoose');

// Define blog schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl:{
    type:String,
    required:false
},
  location: { type: String }, // Location where the blog was created
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
