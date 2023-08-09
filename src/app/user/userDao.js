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

export const selectUserIdByEmail = async(connection,email_id) => {// 이메일로 유저 id 조회
    const selectUserIdQuery = `
        SELECT user_id
        FROM user
        WHERE email_id = ?;
    `;
    const selectUserIdRow = await connection.query(selectUserIdQuery,email_id);
    return selectUserIdRow[0];
};

export const selectUserIdByPostId = async(connection,post_id) => {// 이메일로 유저 id 조회
    const selectUserIdByPostIdQuery = `
        SELECT user_id
        FROM post
        WHERE post_id = ?;
    `;
    const selectUserIdByPostIdRow = await connection.query(selectUserIdByPostIdQuery,post_id);
    return selectUserIdByPostIdRow[0];
};

export const selectAlarms = async(connection, userIdFromJWT) => {// 알림 내역 조회
    const selectAlarmsQuery = `
        SELECT *
        FROM alarm
        WHERE user_id = ?;
    `;
    const selectAlarmsRow = await connection.query(selectAlarmsQuery,userIdFromJWT);
    return selectAlarmsRow;
};

export const updateAlarms = async(connection, alarm_id) => {// 알림 확인 
    const updateAlarmsQuery = `
        UPDATE alarm
        SET ischecked = 1
        WHERE alarm_id= ?;
    `;
    const updateAlarmsRow = await connection.query(updateAlarmsQuery,alarm_id);
    return updateAlarmsRow;
};