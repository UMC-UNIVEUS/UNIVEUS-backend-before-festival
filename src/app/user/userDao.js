export const insertUser = async(connection,email_id) => {

    const insertUserQuery = `INSERT INTO user (email_id) VALUES ('${email_id}');`;
    const insertUserRow = await connection.query(insertUserQuery);
    return insertUserRow
}

export const selectUser = async(connection, email_id) => {

    const selectUserQuery = `SELECT email_id FROM user WHERE email_id = '${email_id}'`;
    const selectUserRow = await connection.query(selectUserQuery);
    return selectUserRow[0];
}

export const insertToken = async(connection, refreshToken, email_id) => {

    const insertTokenQuery = `UPDATE user SET refresh_token = '${refreshToken}' WHERE email_id = '${email_id}';`;
    const insertTokenRow = await connection.query(insertTokenQuery);
    return insertTokenRow[0];
}