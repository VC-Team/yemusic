import { mixed, string } from 'vcc-schema';

const SignUpInput = mixed({
  email: string().email(),
  password: string().min(6),
  username: string().nonempty(),
});

const inputMap = {
  '/api/auth/signUp': SignUpInput,
};

export const validate = (req, res, next) => {
  const input = { ...req.body, ...req.params };
  const validateInput = inputMap[req.originalUrl];

  if (!validateInput) {
    return next();
  }

  const { error } = validateInput.validate(input);

  return error
    ? res.status(500).json({
        message: error.message,
        errorCode: 'E-01',
      })
    : next();
};
