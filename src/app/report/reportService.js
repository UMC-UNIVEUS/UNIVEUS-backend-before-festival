import { insertUserReport, insertPostReport } from "./reportDao"
import pool from "../../../config/database"

/** User Report 생성 */
export const createUserReport = async(reportReasonText, reportedBy, reportedUser, reportReasons) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertUserReportParam = [reportedBy, reportReasonText, reportedUser];

    for (let i = 0; i < reportReasons.length; i++) {
        insertUserReportParam.push(reportReasons[i]);
    }

    const reportUserResult = await insertUserReport(connection, insertUserReportParam);
    connection.release();
};

/** Post Report 생성 */
export const createPostReport = async(reportReasonText, reportedBy, reportedPost, reportReasons) => {
    const connection = await pool.getConnection(async conn => conn);
    const insertPostReportParam = [reportedBy, reportReasonText, reportedPost];

    for (let i = 0; i < reportReasons.length; i++) {
        insertPostReportParam.push(reportReasons[i]);
    }

    const reportPostResult = await insertPostReport(connection, insertPostReportParam);
    connection.release();
};