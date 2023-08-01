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
    SELECT post.post_id, post.category, post.main_img, post.title, post.location, 
           post.meeting_date, post.end_date,
           user.profile_img, user.nickname, user.major, user.class_of, 
           post.current_people, post.limit_people, post.scrapes
    FROM post 
    INNER JOIN user
    ON post.user_id = user.user_id
    WHERE post.user_id = ?
    ;`;
    const selectUserMyUniveRows = await connection.query(selectUserMyUniveQuery, user_id);
    return selectUserMyUniveRows;
};

export const selectUserParticipatebyId = async (connection, user_id)=> {
    const selectUserParticipateQuery = `
    SELECT post.post_id, post.category, post.main_img, post.title, post.location,
           post.meeting_date, post.end_date,
           user.profile_img, user.nickname, user.major, user.class_of,
           post.current_people, post.limit_people, post.scrapes
    From post
    INNER JOIN user
    ON post.user_id = user.user_id
    WHERE post_id IN (SELECT post_id FROM participant_users WHERE user_id = ? );`;
};

export const selectUserScrapesbyId = async(connection, user_id) => {
    const selectUserScrapesQuery = `
     SELECT post.post_id, post.category, post.main_img, post.title, post.location,
            post.meeting_date, post.end_date,
            user.profile_img, user.nickname, user.major, user.class_of,
            post.current_people, post.limit_people, post.scrapes
    From post
    INNER JOIN user
    ON post.user_id = user.user_id
    WHERE post_id IN (SELECT post_id FROM post_scrapes WHERE user_id = ? );`;
}