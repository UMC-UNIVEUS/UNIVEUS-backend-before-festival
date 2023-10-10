import express from "express"
import {sendAuthNumber, login,
    verifyNumber,
    checkNickNameDuplicate, startUniveUs,
    getAlarms, patchAlarms, agreementTerms, getAnalytics,getFriend,requestFriend, patchFriend, deleteFriend} from "./userController"
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import { accountStatusMiddleware } from "../../../config/accountStatusMiddleware";
import {wrapAsync} from "../../../config/errorhandler";

const userRouter = express.Router();

userRouter.get('/analytics', wrapAsync(getAnalytics));
userRouter.post('/login', wrapAsync(login));
userRouter.post('/send/number', wrapAsync(sendAuthNumber));
userRouter.post('/auth/number', jwtMiddleware, wrapAsync(verifyNumber));
userRouter.post('/nickname/check', wrapAsync(checkNickNameDuplicate));
userRouter.post('/start/univeus', jwtMiddleware, wrapAsync(startUniveUs));
userRouter.get('/alarm', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(getAlarms)); // 알림 내역 조회 API
userRouter.patch('/alarm', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(patchAlarms)); // 알림 확인 API
userRouter.post('/agreement', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(agreementTerms));
userRouter.get('/friend', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(getFriend)); // 친구 목록 조회
userRouter.post('/friend', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(requestFriend)); // 친구 신청
userRouter.patch('/friend', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(patchFriend)); // 친구 승인 or 거절
userRouter.delete('/friend', jwtMiddleware, wrapAsync(accountStatusMiddleware), wrapAsync(deleteFriend)); // 친구 삭제


export default userRouter;
