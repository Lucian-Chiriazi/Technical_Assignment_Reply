const request = require('supertest');
const app = require('../app');
const { users } = require('../data/data');

// Clear users array before each test to ensure clean state
beforeEach(() => {
  users.length = 0;
});

describe('User Registration', () => {
  // Mock user data for testing
  const userWithCard = {
    username: 'Lucian123',
    password: 'Password1',
    email: 'lucian123@example.com',
    dob: '1994-03-04',
    creditCardNumber: '1234567812345678'
  };

  const userWithoutCard = {
    username: 'Lucian1234',
    password: 'Password2',
    email: 'lucian1234@example.com',
    dob: '1995-04-05'
  };

  // Test cases for user registration
  it('Register user with credit card', async () => {
    const res = await request(app).post('/users').send(userWithCard);
    expect(res.status).toBe(201);
  });

  // Test case for registering a user without a credit card
  it('Register user without credit card', async () => {
    const res = await request(app).post('/users').send(userWithoutCard);
    expect(res.status).toBe(201);
  });

  // Test case for rejecting duplicate usernames
  it('Reject duplicate username', async () => {
    await request(app).post('/users').send(userWithCard);
    const res = await request(app).post('/users').send(userWithCard);
    expect(res.status).toBe(409);
  });

  // Test case for rejecting invalid password format
  it('Reject invalid password', async () => {
    const invalidPass = { ...userWithCard, username: 'user2', password: 'pass' };
    const res = await request(app).post('/users').send(invalidPass);
    expect(res.status).toBe(400);
  });

  // Test case for rejecting invalid email format
  it('Reject invalid email', async () => {
    const invalidEmail = { ...userWithCard, username: 'Lucian12345', email: 'invalidemail' };
    const res = await request(app).post('/users').send(invalidEmail);
    expect(res.status).toBe(400);
  });

  // Test case for rejecting underage users
  it('Reject underage user', async () => {
    const underage = { ...userWithCard, username: 'child', dob: '2010-01-01' };
    const res = await request(app).post('/users').send(underage);
    expect(res.status).toBe(403);
  });

  // Test case for filetering users by credit card
  it('Filter users by credit card presence', async () => {
    await request(app).post('/users').send(userWithCard);
    await request(app).post('/users').send(userWithoutCard);

    const resYes = await request(app).get('/users?CreditCard=Yes');
    const resNo = await request(app).get('/users?CreditCard=No');

    expect(resYes.body.length).toBe(1);
    expect(resNo.body.length).toBe(1);
    expect(resYes.body[0].username).toBe('Lucian123');
    expect(resNo.body[0].username).toBe('Lucian1234');
  });

  // Test case for returning all users
  it('Return all users with no filter', async () => {
    await request(app).post('/users').send(userWithCard);
    await request(app).post('/users').send(userWithoutCard);

    const res = await request(app).get('/users');
    expect(res.body.length).toBe(2);
  });
});
