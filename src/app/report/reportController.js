import { baseResponse, response } from "../../../config/response";
import { getUserIdByEmail } from "../user/userProvider";
import { createUserReport, createPostReport, createPostReportReason } from "./reportService"
import {sendUserReportAlarm, sendPostReportAlarm} from "../user/userController"


/** 유저 신고하기 API */
export const reportUser = async(req, res) => {
    const reportReason = req.body.reportReason;
    const reportReasonText = req.body.reportReasonText;
    const reportedUser = req.body.reportedUser;
    const reportedBy = await getUserIdByEmail(req.verifiedToken.userEmail);
    
    const reportUserResult = await createUserReport(reportReasonText, reportedBy, reportedUser, reportReason);
    await sendUserReportAlarm(reportedBy,reportedUser); // 유저 신고 알림 (to 관리자)
    res.send(response(baseResponse.REPORT_SUCCESS));
};

/** post 신고하기 API */
export const reportPost = async(req, res) => {
    const reportReason = req.body.reportReason;
    const reportReasonText = req.body.reportReasonText;
    const reportedPost = req.body.reportedPost;
    const reportedBy = await getUserIdByEmail(req.verifiedToken.userEmail);

    const reportPostResult = await createPostReport(reportReasonText, reportedBy, reportedPost);
    const reportReasonResult = await createPostReportReason(reportPostResult, reportReason);
    await sendPostReportAlarm(reportedBy, reportedPost); // 게시글 신고 알림 (to 관리자)
    res.send(response(baseResponse.REPORT_SUCCESS));
}