/** 유저 신고 insert */
export const insertUserReport = async(connection, insertUserReportParams) => {
    const insertUserReportQuery =  `INSERT INTO user_reports (reported_by, report_reason_text, 
        report_user_id, report_status) VALUES (?, ?, ?, 0);`;
    const [insertUserReportRow] = await connection.query(insertUserReportQuery, insertUserReportParams);
    /** insert후 테이블 id 반환 */
    return insertUserReportRow.insertId;
}

/** 유저 신고 사유 insert */
export const insertUserReportReason = async(connection, insertUserReportReasonParams) => {
    const insertUserReportReasonQuery = `INSERT INTO user_report_reasons (report_reason, user_report_id) VALUES (?, ?)`;
    const insertUserReportReasonRow = await connection.query(insertUserReportReasonQuery, insertUserReportReasonParams);
    return insertUserReportReasonRow;
}