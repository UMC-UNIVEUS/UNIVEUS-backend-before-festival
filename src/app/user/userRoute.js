import express from "express"
import {sendAuthNumber, login, 
    verifyNumber,
    checkNickNameDuplicate, startUniveUs,
    getAlarms, patchAlarms} from "./userController"
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const userRouter = express.Router();

userRouter.post('/login', login);
// userRouter.get('/signup/redirect', signupRedirect);
userRouter.post('/send/number', sendAuthNumber);
userRouter.post('/auth/number', verifyNumber);
userRouter.post('/nickname/check', checkNickNameDuplicate);
userRouter.post('/start/univeus', startUniveUs);
userRouter.get('/:user_id/alarm', jwtMiddleware, getAlarms); // 알림 내역 조회 API
userRouter.patch('/:user_id/alarm', jwtMiddleware, patchAlarms); // 알림 확인 API

export default userRouter;
