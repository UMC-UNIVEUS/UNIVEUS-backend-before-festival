import { baseResponse, errResponse, response } from "../../../config/response";
import { getUserIdByEmail } from "../user/userProvider";
import { createUserReport, createUserReportReason, createPostReport, createPostReportReason } from "./reportService"


/** 유저 신고하기 API */
export const reportUser = async(req, res) => {
    const reportReason = req.body.reportReason;
    const reportReasonText = req.body.reportReasonText;
    const reportedUser = req.body.reportedUser;
    const reportedBy = await getUserIdByEmail(req.verifiedToken.userEmail);

    const reportUserResult = await createUserReport(reportReasonText, reportedBy, reportedUser);
    const reportReasonResult = await createUserReportReason(reportUserResult, reportReason);
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
    res.send(response(baseResponse.REPORT_SUCCESS));
}