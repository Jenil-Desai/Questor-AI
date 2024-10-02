import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const userSignup = async (req, res) => {
  console.table(req.body)
 
  const { username, fullname, email, password, type } = req.body;

  const checkUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (checkUser) {
    return res.status(403).json({ error: "User Exists With Given Username & Email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      password: hashedPassword,
      type,
    },
  });

  const token = jwt.sign({ id: newUser.id, username: newUser.username, email: newUser.email }, process.env.JWT_SECRET);
  res.status(200).json(token);
};

export const userSignin = async (req, res) => {
  const { username, password } = req.body;

  const checkUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!checkUser) {
    return res.status(403).json({ error: "Username Is Incorrect" });
  }

  const result = await bcrypt.compare(password, checkUser.password);
  if (!result) {
    return res.status(403).json({ error: "Password Is Incorrect" });
  }

  const token = jwt.sign({ id: checkUser.id, username: checkUser.username, email: checkUser.email }, process.env.JWT_SECRET);
  res.status(200).json(token);
};

export const userDetails = async (req, res) => {
  const { id, username, email } = res.locals.user;

  const user = await prisma.user.findUnique({
    where: {
      id,
      username,
      email,
    },
  });

  res.status(200).json(user);
};

export const userDestroy = async (req, res) => {
  const { id, username, email } = res.locals.user;

  const destroyedUser = await prisma.user.delete({
    where: {
      id,
      username,
      email,
    },
  });

  res.status(200).json(destroyedUser);
};
