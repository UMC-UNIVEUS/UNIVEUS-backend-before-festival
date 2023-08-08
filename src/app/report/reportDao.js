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

/** 게시글 신고 insert */
export const insertPostReport = async(connection, insertPostReportParams) => {
    const insertPostReportQuery =  `INSERT INTO post_reports (report_reason_text, reported_by, 
        post_id, report_status) VALUES (?, ?, ?, 0);`;
    const [insertPostReportRow] = await connection.query(insertPostReportQuery, insertPostReportParams);
    /** insert후 테이블 id 반환 */
    return insertPostReportRow.insertId;
}

/** 게시글 신고 사유 insert */
export const insertPostReportReason = async(connection, insertPostReportReasonParams) => {
    const insertPostReportReasonQuery = `INSERT INTO post_report_reasons (report_reason, post_report_id) VALUES (?, ?)`;
    const insertPostReportReasonRow = await connection.query(insertPostReportReasonQuery, insertPostReportReasonParams);
    return insertPostReportReasonRow;
}