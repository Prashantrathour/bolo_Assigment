const mongoose = require('mongoose');

// Response Schema
const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId },
  user: { type: String, required: true },
  marks: { type: Number, required: true },
  questions:[]
}, { timestamps: true });

// Form Schema
const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  questions: { type: {} },
}, { timestamps: true });

// Models
const Response = mongoose.model('Response', responseSchema);
const Form = mongoose.model('Form', formSchema);

module.exports = { Response, Form };
