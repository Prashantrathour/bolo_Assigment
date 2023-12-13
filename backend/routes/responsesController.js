

const express = require('express');
const { Response } = require('../models/form.model');
const response_router = express.Router();


/**
 * @route   GET /responses/:formId
 * @desc    Get responses for a specific form by formId
 */
response_router.get('/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.status(200).json({ message: 'Responses fetched successfully', data: responses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /responses
 * @desc    Create a new response
 */
response_router.post('/', async (req, res) => {
  const data = req.body;
  try {
    if (!data) {
      return res.status(400).json({ message: 'Please provide response data in the request body' });
    }
    const response = await Response.create(data);
    res.status(201).json({ message: 'Response created successfully', data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = response_router;
