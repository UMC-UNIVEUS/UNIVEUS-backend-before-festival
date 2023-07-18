/*User 관련 데이터베이스, Query가 작성되어 있는 곳*/


export const selectUserDefaultProfilebyId = async (connection, id) => {
    const selectUserDefaultProfilebyIdquery = `
        SELECT nickname, profile_img, major, class_of, 
               participant_num, reported_num FROM user WHERE user_id = ?;`;

    const DefaultprofileRows = await connection.query(selectUserDefaultProfilebyIdquery, id);
    return DefaultprofileRows;

};

export const selectUserIntroProfilebyId = async (connection, id) => {
    const selectUserIntroProfilebyIdquery = `
    SELECT nickname, gender, profile_img, interest, introduce FROM user WHERE user_id = ?;`;

    const IntroprofileRows = await connection.query(selectUserDefaultProfilebyIdquery, id);
    return IntroprofileRows;

};

