// formsController.js

const express = require('express');
const { Form } = require('../models/form.model');
const FormControllrouter = express.Router();


/**
 * @route   GET /forms
 * @desc    Get all forms
 */
FormControllrouter.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /forms/get/:id
 * @desc    Get a single form by ID
 */
FormControllrouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /forms
 * @desc    Create a new form
 */
FormControllrouter.post('/', async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    if (!data) {
      return res.status(400).json({ message: 'Please provide form data in the request body' });
    }
    const form = await Form.create(data);
    res.status(201).json({ message: 'Form created successfully', data: form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   DELETE /forms/:id
 * @desc    Delete a form by ID
 */
FormControllrouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: 'Please provide the form ID' });
    }
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully', data: form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PATCH /forms/:id
 * @desc    Update a form by ID
 */
FormControllrouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: 'Please provide the form ID' });
    }
    const form = await Form.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form updated successfully', data: form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = FormControllrouter;
