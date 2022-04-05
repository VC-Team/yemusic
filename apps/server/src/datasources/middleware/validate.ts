import { mixed, string } from 'vcc-schema';

const SignUpInput = mixed({
  email: string().email(),
  password: string().min(6),
  firstName: string().nonempty(),
  lastName: string().nonempty(),
});

const inputMap = {
  '/api/signUp': SignUpInput,
};

export const validate = (req, res, next) => {
  const input = { ...req.body, ...req.params };

  const { error } = inputMap[req.originalUrl].validate(input);

  return error
    ? res.status(500).json({
        isSuccess: false,
        message: error.message,
      })
    : next();
};