import express from "express"
import {sendAuthNumber, login, loginRedirect, 
    signup, signupRedirect, verifyNumber} from "./userController"
const userRouter = express.Router();

userRouter.get('/login', login);
userRouter.get('/login/redirect', loginRedirect);
userRouter.get('/signup', signup);
userRouter.get('/signup/redirect', signupRedirect);
userRouter.post('/send/number', sendAuthNumber);
userRouter.post('/auth/number', verifyNumber);

export default userRouter;
