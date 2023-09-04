import express from "express";
import{ getUsersInfo, patchPostByAdmin, deletePostByAdmin, patchStatusByAdmin, patchHiddenByAdmin } from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const adminRouter = express.Router();

adminRouter.get('/users-info', jwtMiddleware, getUsersInfo);
adminRouter.patch('/post/:post_id', jwtMiddleware,patchPostByAdmin); // 게시글 수정 
adminRouter.delete('/post/:post_id', jwtMiddleware, deletePostByAdmin); // 게시글 삭제 
adminRouter.patch('/post/:post_id/status', jwtMiddleware, patchStatusByAdmin); // 게시글 상태 변경
adminRouter.patch('/post/:post_id/hidden', jwtMiddleware, patchHiddenByAdmin); // 게시글 공개, 비공개 설정

export default adminRouter;