import express from "express";
import{ getUsersInfo, postPostByAdmin, patchPostByAdmin, 
    deletePostByAdmin, patchStatusByAdmin, patchHiddenByAdmin,
    adminSignUp, userReports, postReports} from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import { adminMiddleware } from "../../../config/adminMiddleware";

const adminRouter = express.Router();

adminRouter.use(jwtMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.get('/users-info', getUsersInfo);
adminRouter.post('/post',postPostByAdmin); // 게시글 작성
adminRouter.patch('/post/:post_id',patchPostByAdmin); // 게시글 수정 
adminRouter.delete('/post/:post_id', deletePostByAdmin); // 게시글 삭제 
adminRouter.patch('/post/:post_id/status', patchStatusByAdmin); // 게시글 상태 변경
adminRouter.patch('/post/:post_id/hidden', patchHiddenByAdmin); // 게시글 공개, 비공개 설정
adminRouter.get('/signup', adminSignUp);
adminRouter.get('/user-reports', userReports);
adminRouter.get('/post-reports', postReports);

export default adminRouter;