import express from "express"
import {login, loginRedirect, signup, signupRedirect} from "./userController"
const userRouter = express.Router();

userRouter.get('/login', login);
userRouter.get('/login/redirect', loginRedirect);
userRouter.get('/signup', signup);
userRouter.get('/signup/redirect', signupRedirect);

export default userRouter;
