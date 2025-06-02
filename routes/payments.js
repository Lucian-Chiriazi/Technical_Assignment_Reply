const express = require('express');
const { users, payments } = require('../data/data');
const { validatePayment } = require('../validation/validation');

// Payment routes
const router = express.Router();

router.post('/', (req, res) => {
  // Validate the payment request body
  const { valid, code } = validatePayment(req.body);
  if (!valid) return res.sendStatus(code);

  // Check if the credit card number exists for a registered user
  const matchUser = users.find(user => user.creditCardNumber === req.body.creditCardNumber);
  if (!matchUser) return res.sendStatus(404);

  // If everything is valid, save the payment
  payments.push(req.body);
  res.sendStatus(201);
});

module.exports = router;