import { userSignInBodySchema, userSignUpBodySchema } from "../validations/user.js";

export const validateUserSignupBody = (req, res, next) => {
  const body = req.body;

  const result = userSignUpBodySchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({ error: `${result.error.issues[0].path[0]} ${result.error.issues[0].message}` });
  }
  next();
};

export const validateUserSignInBody = (req, res, next) => {
  const body = req.body;

  const result = userSignInBodySchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({ error: `${result.error.issues[0].path[0]} ${result.error.issues[0].message}` });
  }
};
