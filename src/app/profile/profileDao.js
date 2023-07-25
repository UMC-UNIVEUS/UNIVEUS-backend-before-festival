/*Profile 관련 데이터베이스, Query가 작성되어 있는 곳*/

export const selectUserbyId = async (connetion, user_id) => {
    const selectUserbyIdQuery = `
  SELECT * FROM user WHERE user_id = ?;`;

    const userRows = await connetion.query(selectUserbyIdQuery, user_id);
    return userRows;
};


export const selectUserDefaultProfilebyId = async (connection, user_id) => {
    const selectUserDefaultProfilebyIdquery = `
        SELECT nickname, profile_img, major, class_of, 
               participant_num, reported_num FROM user WHERE user_id = ?;`;

    const DefaultprofileRows = await connection.query(selectUserDefaultProfilebyIdquery, user_id);
    return DefaultprofileRows;

};

export const selectUserIntroProfilebyId = async (connection, user_id) => {
    const selectUserIntroProfilebyIdquery = `
    SELECT nickname, gender, profile_img, interest, introduce FROM user WHERE user_id = ?;`;

    const IntroprofileRows = await connection.query(selectUserIntroProfilebyIdquery, user_id);
    return IntroprofileRows;

};

export const modifyProfilebyId = async (connection, params) => {
    const modifyProfileQuery = `
UPDATE user
SET nickname = ?, gender = ?, profile_img = ?, interest = ?, introduce = ?
WHERE user_id = ? ;`;

    const modifyProfileRows = await connection.query(modifyProfileQuery, params);
    return modifyProfileRows;
};

export const selectUserMyUnivebyId = async (connection, user_id)=> {
    const selectUserMyUniveQuery = `
    SELECT post_id, title, category, created_at, scrapes, location, meeting_date, end_date,
    current_people, limit_people
    FROM post 
    WHERE user_id = ?
    ;`;
    const selectUserMyUniveRows = await connection.query(selectUserMyUniveQuery, user_id);
    return selectUserMyUniveRows;
}
