import passwordValidator from 'password-validator';

export const validatePassword = (value) => {
  const schema = new passwordValidator();

  schema.is().min(6).is().max(20).has().digits(1).has().not().spaces();

  const isPasswordValid = schema.validate(value, { details: true });

  if (isPasswordValid.length > 0) {
    return { passwordValid: false, message: isPasswordValid[0].message };
  }

  return { passwordValid: true };
};
