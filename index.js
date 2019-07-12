const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Template = require('./models/Template');

// create connection with database
mongoose.connect(
  'mongodb://localhost/service_demo',
  { useNewUrlParser: true }
);
// create express instance and add some helpful middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  var pagination = {
    limit: perPage,
    skip: perPage * (pageNumber - 1),
  };
  try {
    const doc = await Template.find({ published: true })
      .sort({ _id: 1 })
      .limit(pagination.limit)
      .skip(pagination.skip);
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const doc = await Template.findOne({ _id: req.params.id, published: true });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post('/', async (req, res) => {
  const template = new Template(req.body);
  try {
    const doc = await template.save();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const doc = await Template.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const doc = await Template.findOneAndUpdate(
      { _id: req.params.id },
      { published: false }
    );
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = app;
