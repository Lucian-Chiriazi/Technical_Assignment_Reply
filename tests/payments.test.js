const request = require('supertest');
const app = require('../app');
const { users, payments } = require('../data/data');

// Clear the users and payments arrays before each test
beforeEach(() => {
  users.length = 0;
  payments.length = 0;
});


describe('Payments', () => {
  // Create a mock user for testing
  const user = {
    username: 'Lucian123',
    password: 'Password123',
    email: 'lucian@example.com',
    dob: '1994-03-04',
    creditCardNumber: '1234567891011121'
  };

  // Add the user to the users array before running tests
  beforeEach(() => users.push(user));

  // Test for valid payment
  it('Check valid payment', async () => {
    const res = await request(app).post('/payments').send({
      creditCardNumber: '1234567891011121',
      amount: 100
    });
    expect(res.status).toBe(201);
  });

  // Test for payment with invalid credit card number
  it('Check unregistered card', async () => {
    const res = await request(app).post('/payments').send({
      creditCardNumber: '1234567890000000',
      amount: 100
    });
    expect(res.status).toBe(404);
  });

  // Test for payment with invalid amount
  it('Check invalid amount', async () => {
    const res = await request(app).post('/payments').send({
      creditCardNumber: '1234567891011121',
      amount: 1234
    });
    expect(res.status).toBe(400);
  });
});
