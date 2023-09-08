import { insertUserReport, insertPostReport, insertPostReportReason } from "./reportDao"
import pool from "../../../config/database"

/** User Report 생성 */
export const createUserReport = async(reportReasonText, reportedBy, reportedUser, reportReason) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertUserReportParams = [reportedBy, reportReasonText, reportedUser];

    for (let i = 0; i < reportReason.length; i++) {
        insertUserReportParams.push(reportReason[i]);
    }

    const reportUserResult = await insertUserReport(connection, insertUserReportParams);
    connection.release();
}

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