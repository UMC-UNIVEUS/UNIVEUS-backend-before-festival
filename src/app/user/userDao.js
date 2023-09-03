/** user에 Email Id insert */
export const insertUserEmailId = async(connection, email_id) => {
    const insertUserQuery = `INSERT INTO user (email_id) VALUES ('${email_id}');`;
    const insertUserRow = await connection.query(insertUserQuery);
    return insertUserRow
}

export const selectUser = async(connection, email_id) => {

    const selectUserQuery = `SELECT email_id FROM user WHERE email_id = '${email_id}'`;
    const selectUserRow = await connection.query(selectUserQuery);
    return selectUserRow[0];
}

export const selectUserByNickname = async(connection, nickname) => {

    const selectUserQuery = `SELECT nickname FROM user WHERE nickname = '${nickname}'`;
    const selectUserRow = await connection.query(selectUserQuery);
    return selectUserRow[0];
}

/** 본인인증 후 userInfo insert */
export const updateUserProfileInfo = async(connection, updateUserParams) => {
    const userInfo = updateUserParams.userInfo;
    const userEmail = updateUserParams.userEmail;

    const updateUserQuery = 
    `
        UPDATE user
        SET 
        nickname =?,
        gender = ?,
        major = ?,
        class_of = ?,
        auth_status = 1
        WHERE email_id = ?;
    `;

    const values = [  
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

export const selectUserNickNameById = async(connection,user_id) => {// user_id로 유저 닉네임 조회
    const selectUserNickNameByIdQuery = `
        SELECT nickname
        FROM user
        WHERE user_id = ?;
    `;
    const [UserNickNameByIdRow] = await connection.query(selectUserNickNameByIdQuery,user_id);
    return UserNickNameByIdRow[0];
};

export const selectUserById = async(connection,user_id) => {// id로 유저 전체 조회
    const selectUserByIdQuery = `
        SELECT *
        FROM user
        WHERE user_id = ?;
    `;
    const [UserByIdRow] = await connection.query(selectUserByIdQuery,user_id);
    return UserByIdRow[0];
};

export const selectUserByNickName = async(connection,nickname) => {// 닉네임으로 유저 전체 조회
    const selectUserByNickNameQuery = `
        SELECT *
        FROM user
        WHERE nickname = ?;
    `;
    const [UserByNickNameRow] = await connection.query(selectUserByNickNameQuery,nickname);
    return UserByNickNameRow[0];
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

/** user의 phone 번호 update */
export const updateUserPhoneNumber = async(connection, userPhoneNumber, userId) => {
    const updateUserQuery = `UPDATE user SET phone = '${userPhoneNumber}' WHERE user_id = ${userId};`;
    const updateUserRow = await connection.query(updateUserQuery);
    return updateUserRow;
}

/** user의 phone 번호 update */
export const selectPhoneByEmail = async(connection, userEmail) => {
    const selectPhoneByEmailQuery = `SELECT phone FROM user WHERE email_id = '${userEmail}';`;
    const selectPhoneByEmailRow = await connection.query(selectPhoneByEmailQuery);
    return selectPhoneByEmailRow;
}

/**user의 auth_status를 검색 */
export const selectAuthStatusByEmail = async(connection, userEmail) => {
    const selectAuthStatusByEmailQuery = `SELECT auth_status FROM user WHERE email_id = '${userEmail}';`;
    const selectAuthStatusByEmailRow = await connection.query(selectAuthStatusByEmailQuery);
    return selectAuthStatusByEmailRow;
}