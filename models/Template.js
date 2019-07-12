const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  type: String,
  name: String,
  label: String,
  help_text: String,
  default_value: mongoose.Schema.Types.Mixed,
  choices: [mongoose.Schema.Types.Mixed],
});

const TemplateSchema = new mongoose.Schema({
  name: String,
  created_by: Number,
  published: { type: Boolean, default: true },
  fields: [FieldSchema],
});

const Template = mongoose.model('Template', TemplateSchema);
module.exports = Template;
