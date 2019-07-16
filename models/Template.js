const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  title: String,
  type: String,
  required: [String],
  definitions: mongoose.Schema.Types.Mixed,
  properties: mongoose.Schema.Types.Mixed,
  dependencies: mongoose.Schema.Types.Mixed,
  created_by: Number,
  published: { type: Boolean, default: true },
});

const Template = mongoose.model('Template', TemplateSchema);
module.exports = Template;
