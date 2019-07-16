const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Template = require('./models/Template');

// create connection with database
mongoose.connect(
  //'mongodb://localhost/service_demo',
  'mongodb://ventura:test123@ds135207.mlab.com:35207/service_demo',
  { useNewUrlParser: true }
);

// create express instance and add some helpful middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Get a list of templates
 * Params:
 *   perPage
 *   pageNumber
 */
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

/**
 * Get a single template
 */
app.get('/:id', async (req, res) => {
  try {
    const doc = await Template.findOne({ _id: req.params.id, published: true });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Create a template
 */
app.post('/', async (req, res) => {
  const template = new Template(req.body);
  try {
    const doc = await template.save();
    res.status(201).json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Update a template
 */
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

/**
 * Delete (soft) a template
 */
app.delete('/:id', async (req, res) => {
  try {
    const doc = await Template.findOneAndUpdate(
      { _id: req.params.id },
      { published: false }
    );
    res.status(204).json({ message: 'ok' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));

module.exports = app;
