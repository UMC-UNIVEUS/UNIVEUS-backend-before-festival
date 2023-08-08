import { insertUserReport, insertUserReportReason, insertPostReport, insertPostReportReason } from "./reportDao"
import pool from "../../../config/database"

/** User Report 생성 */
export const createUserReport = async(reportReasonText, reportedBy, reportedUser) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertUserReportParams = [reportedBy, reportReasonText, reportedUser];
    const reportUserResult = await insertUserReport(connection, insertUserReportParams);
    connection.release();
    return reportUserResult;
}

/** User Report Reason 생성 */
export const createUserReportReason = async (reportUserResult, reportReasons) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertReportReasonParams = reportReasons.map(reason => ({
        reportReason: reason,
        userReportId: reportUserResult
    }));
    for (const params of insertReportReasonParams) {
        await insertUserReportReason(connection, [params.reportReason, params.userReportId]);
    }
    connection.release();
    return null;
};

/** Post Report 생성 */
export const createPostReport = async(reportReasonText, reportedBy, reportedPost) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertPostReportParams = [reportReasonText, reportedBy, reportedPost];
    const reportPostResult = await insertPostReport(connection, insertPostReportParams);
    connection.release();
    return reportPostResult;
}

/** Post Report Reason 생성 */
export const createPostReportReason = async (reportPostResult, reportReason) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertReportReasonParams = reportReason.map(reason => ({
        reportReason : reason,
        postReportId: reportPostResult
    }));
    for (const params of insertReportReasonParams) {
        await insertPostReportReason(connection, [params.reportReason, params.postReportId]);
    }
    connection.release();
    return null;
}