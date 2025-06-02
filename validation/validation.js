function validateUser(user) {
  // Regular expressions
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const creditCardRegex = /^\d{16}$/;
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Perform validations for each field
  const usernameIsValid = typeof user.username === 'string' && usernameRegex.test(user.username);
  const passwordIsValid = typeof user.password === 'string' && passwordRegex.test(user.password);
  const emailIsValid = typeof user.email === 'string' && emailRegex.test(user.email);
  const dobIsValid = typeof user.dob === 'string' && isoDateRegex.test(user.dob) && !isNaN(Date.parse(user.dob));
  const creditCardIsValid = !user.creditCardNumber || creditCardRegex.test(user.creditCardNumber);

  // Calculate user age
  const birth = new Date(user.dob);
  const getAge = Date.now() - birth.getTime();
  const ageDate = new Date(getAge);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);


  // Error handling for invalid fields
  if (!usernameIsValid || !passwordIsValid || !emailIsValid || !dobIsValid || !creditCardIsValid) {
    return { valid: false, code: 400 };
  }

  // Error handling for age
  if (userAge < 18) return { valid: false, code: 403 };

  // If all validations pass
  return { valid: true };
}

// Perform payment validation
function validatePayment(payment) {
  // Regular expressions
  const creditCardRegex = /^\d{16}$/;
  const amountRegex = /^\d{1,3}$/;

  // Perform validations for each field
  const creditCarsIsValid = creditCardRegex.test(payment.creditCardNumber);
  const amountIsValid = amountRegex.test(String(payment.amount));

  // Error handling for invalid fields
  if (!creditCarsIsValid || !amountIsValid) {
    return { valid: false, code: 400 };
  }

  // If all validations pass
  return { valid: true };
}

module.exports = { validateUser, validatePayment };
