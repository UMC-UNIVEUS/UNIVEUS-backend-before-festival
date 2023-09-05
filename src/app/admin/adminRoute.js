import express from "express";
import{ getUsersInfo, postPostByAdmin, patchPostByAdmin, 
    deletePostByAdmin, patchStatusByAdmin, patchHiddenByAdmin,
    adminSignUp, userReports, postReports} from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";

const adminRouter = express.Router();

adminRouter.get('/users-info', jwtMiddleware, getUsersInfo);
adminRouter.post('/post', jwtMiddleware,postPostByAdmin); // 게시글 작성
adminRouter.patch('/post/:post_id', jwtMiddleware,patchPostByAdmin); // 게시글 수정 
adminRouter.delete('/post/:post_id', jwtMiddleware, deletePostByAdmin); // 게시글 삭제 
adminRouter.patch('/post/:post_id/status', jwtMiddleware, patchStatusByAdmin); // 게시글 상태 변경
adminRouter.patch('/post/:post_id/hidden', jwtMiddleware, patchHiddenByAdmin); // 게시글 공개, 비공개 설정
adminRouter.get('/signup', jwtMiddleware, adminSignUp);
adminRouter.get('/user-reports', jwtMiddleware, userReports);
adminRouter.get('/post-reports', jwtMiddleware, postReports);

export default adminRouter;