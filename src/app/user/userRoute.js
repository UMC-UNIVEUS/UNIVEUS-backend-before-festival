import express from "express"
import {sendAuthNumber, login, 
    verifyNumber,
    checkNickNameDuplicate, startUniveUs,
    getAlarms, patchAlarms, agreementTerms} from "./userController"
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import { accountStatusMiddleware } from "../../../config/accountStatusMiddleware";

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/send/number', sendAuthNumber);
userRouter.post('/auth/number', jwtMiddleware, verifyNumber);
userRouter.post('/nickname/check', checkNickNameDuplicate);
userRouter.post('/start/univeus', jwtMiddleware, startUniveUs);
userRouter.get('/:user_id/alarm', jwtMiddleware, accountStatusMiddleware, getAlarms); // 알림 내역 조회 API
userRouter.patch('/:user_id/alarm', jwtMiddleware, accountStatusMiddleware,patchAlarms); // 알림 확인 API
userRouter.post('/agreement', jwtMiddleware, accountStatusMiddleware, agreementTerms);

export default userRouter;
