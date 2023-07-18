/*User 관련 데이터베이스, Query가 작성되어 있는 곳*/


export const selectUserProfilebyId = async (connection, id) => {
    const selectUserProfilebyIdquery = `
        SELECT nickname, profile_img, major, class_of, 
               participant_num, reported_num FROM user WHERE user_id = ?;`;

    const userRows = await connection.query(selectUserProfilebyIdquery, id);
    return userRows;


};

