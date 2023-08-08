import { baseResponse, errResponse, response } from "../../../config/response";
import { getUserIdByEmail } from "../user/userProvider";
import { createUserReport, createReportReason } from "./reportService"


/** 유저 신고하기 API */
export const reportUser = async(req, res) => {
    const reportReason = req.body.reportReason;
    const reportReasonText = req.body.reportReasonText;
    const reportedUser = req.body.reportedUser;
    const reportedBy = await getUserIdByEmail(req.verifiedToken.userEmail);

    const reportUserResult = await createUserReport(reportReasonText, reportedBy, reportedUser);
    const reportReasonResult = await createReportReason(reportUserResult, reportReason);
    res.send(response(baseResponse.REPORT_SUCCESS));
};