import express from "express"
import {sendAuthNumber, login, loginRedirect, 
    signup, signupRedirect, verifyNumber,
    checkNickNameDuplicate} from "./userController"
const userRouter = express.Router();

userRouter.get('/login', login);
userRouter.get('/login/redirect', loginRedirect);
userRouter.get('/signup', signup);
userRouter.get('/signup/redirect', signupRedirect);
userRouter.post('/send/number', sendAuthNumber);
userRouter.post('/auth/number', verifyNumber);
userRouter.post("/nickname/check", checkNickNameDuplicate);

export default userRouter;
