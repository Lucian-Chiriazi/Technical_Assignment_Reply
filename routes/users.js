const express = require('express');
const { users } = require('../data/data');
const { validateUser } = require('../validation/validation');

// User routes
const router = express.Router();

router.post('/', (req, res) => {
  // Validate the user request body
  const { valid, code } = validateUser(req.body);
  if (!valid) return res.sendStatus(code);

  // Check if the username already exists
  if (users.some(user => user.username === req.body.username)) return res.sendStatus(409);

  // If everything is valid, save the user
  users.push(req.body);
  res.sendStatus(201);
});

router.get('/', (req, res) => {
  // Get the filter from query parameters
  const filter = req.query.CreditCard;

  // If filter is provided, filter users by credit card
  if (filter === 'Yes') {
    return res.json(users.filter(user => user.creditCardNumber));
  } else if (filter === 'No') {
    return res.json(users.filter(user => !user.creditCardNumber));
  }

  // If no filter, return all users
  res.json(users);
});

module.exports = router;