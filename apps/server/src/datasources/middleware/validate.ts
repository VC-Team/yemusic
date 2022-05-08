import { mixed, string } from 'vcc-schema';

const SignUpInput = mixed({
  email: string().email(),
  password: string().min(6),
  displayName: string().min(1),
});

const SendEmailVerifyInput = mixed({
  email: string().email(),
});

const inputMap = {
  '/api/auth/signUp': SignUpInput,
  '/api/auth/sendEmailVerify': SendEmailVerifyInput,
};

export const validate = (req, res, next) => {
  const validateInput = inputMap[req.originalUrl];

  if (!validateInput) {
    return next();
  }

  const { error } = validateInput.validate(req.body);

  return error
    ? res.status(500).json({
        message: error.message,
        errorCode: 'E-01',
      })
    : next();
};
