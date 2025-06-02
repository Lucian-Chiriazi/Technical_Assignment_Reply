const express = require('express');
const usersRouter = require('./routes/users');
const paymentsRouter = require('./routes/payments');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/payments', paymentsRouter);

// Start the server only when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => console.log('Server running'));
}
module.exports = app;

