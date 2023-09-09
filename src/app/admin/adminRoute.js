import express from "express";
import{ getUsersInfo, postPostByAdmin, patchPostByAdmin, 
    deletePostByAdmin, patchStatusByAdmin, patchHiddenByAdmin,
    adminSignUp, userReports, postReports, adminHome, userHome, 
    adminSignUpPage,adminUserBlockPage, adminUserBlock} from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import { adminMiddleware } from "../../../config/adminMiddleware";

const adminRouter = express.Router();

// adminRouter.use(jwtMiddleware);
// adminRouter.use(adminMiddleware);

adminRouter.get('/', adminHome);
adminRouter.post('/post',postPostByAdmin); // 게시글 작성
adminRouter.patch('/post/:post_id',patchPostByAdmin); // 게시글 수정 
adminRouter.delete('/post/:post_id', deletePostByAdmin); // 게시글 삭제 
adminRouter.patch('/post/:post_id/status', patchStatusByAdmin); // 게시글 상태 변경
adminRouter.patch('/post/:post_id/hidden', patchHiddenByAdmin); // 게시글 공개, 비공개 설정

adminRouter.post('/user/signup', adminSignUp);
adminRouter.get('/user/signup', adminSignUpPage)

adminRouter.get('/user/info', getUsersInfo);
adminRouter.get('/user/reports', userReports); // 신고 유저 확인
adminRouter.get('/user', userHome);
adminRouter.get('/post-reports', postReports);

adminRouter.get('/user/block/:reportId/:userId', adminUserBlockPage);
adminRouter.put('/user/block/:reportId/:userId', adminUserBlock);

export default adminRouter;