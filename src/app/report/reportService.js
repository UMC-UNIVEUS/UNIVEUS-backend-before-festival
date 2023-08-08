import { insertUserReport, insertUserReportReason } from "./reportDao"
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
export const createReportReason = async (reportUserResult, reportReasons) => {
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