# Video Streaming Subscription Service (Express.js API)

This project is a backend Express.js API for managing users and payments for a video streaming subscription service. It includes user validation, payment validation, and comprehensive test coverage using Jest and Supertest.

### 1. Node
Make sure you have node installed in your application.
In your terminal run this command to check if you have node installed : node -v

If not you can download and install node here: https://nodejs.org/

### 2. Install dependencies
Make sure you are inside the Lucian_Chiriazi_Reply_Technical_Assignment directory after unzip.

Run this command inside terminal:
npm install

### 3. Start the server
npm start

Server will be running at: http://localhost:3000

### Run all tests
npm test

This will run Jest, testing both users and payments with Supertest.

### User Endpoints
- `POST /users` – Register a new user  
- `GET /users` – Get all users  
- `GET /users?CreditCard=Yes` – Get users with a credit card  
- `GET /users?CreditCard=No` – Get users without a credit card  

### Payment Endpoints
- `POST /payments` – Submit a payment  

## Validation Rules

### User Registration
`username`         - Alphanumeric only                                 
`password`         - At least 8 chars, one number, one uppercase    
`email`            - Must be a valid email format                
`dob`              - Must be in `YYYY-MM-DD` format, age ≥ 18       
`creditCardNumber` - Optional, but must be 16 digits if provided       

### Payments
`creditCardNumber` - Must be 16 digits                         
`amount`           - Must be 1–3 digits only

## Author
Lucian Chiriazi  
