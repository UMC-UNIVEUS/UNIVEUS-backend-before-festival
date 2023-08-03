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

export const selectUserByNickname = async(connection, nickname) => {

    const selectUserQuery = `SELECT nickname FROM user WHERE nickname = '${nickname}'`;
    const selectUserRow = await connection.query(selectUserQuery);
    return selectUserRow[0];
}

/** 본인인증 후 userInfo 삽입 DB에 PHONE 컬럼 추가*/
export const insertAuthUser = async(connection, insertUserParams) => {
    const userInfo = insertUserParams.userInfo;
    const userEmail = insertUserParams.userEmail;

    const updateUserQuery = `UPDATE user SET phone = ?, nickname = ?, gender = ?, major = ?, class_of = ? WHERE email_id = ?`;

    const values = [
      userInfo.phone,      
      userInfo.nickname,  
      userInfo.gender,      
      userInfo.major,       
      userInfo.studentId,    
      userEmail
    ];
  
    const updateUserRow = await connection.query(updateUserQuery, values);
    return updateUserRow;
  };

  export const selectUserIdByEmail= async(connection,email_id) => {// 이메일로 유저 id 조회
    const selectUserIdQuery = `
        SELECT user_id
        FROM user
        WHERE email_id = ?;
    `;
    const selectUserIdRow = await connection.query(selectUserIdQuery,email_id);
    return selectUserIdRow[0];
}