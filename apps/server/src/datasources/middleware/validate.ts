import { mixed, string } from 'vcc-schema';

const SignUpInput = mixed({
  email: string().email(),
  password: string().min(6),
  displayName: string().min(1),
});

const SendEmailVerifyInput = mixed({
  email: string().email(),
});

const SignInInput = mixed({
  account: string(),
  password: string().min(6),
});

const inputMap = {
  '/api/user/signUp': SignUpInput,
  '/api/user/sendEmailVerify': SendEmailVerifyInput,
  '/api/user/signIn': SignInInput,
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
