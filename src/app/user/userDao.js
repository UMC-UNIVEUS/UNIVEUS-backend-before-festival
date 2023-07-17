/*User 관련 데이터베이스, Query가 작성되어 있는 곳*/

export const selectUserProfilebyId = async (connection, id) => {
    const selectUserProfilebyIdquery = `
        SELECT * FROM user WHERE id = ?;`;

    const userRows = await connetion.query(selectUserProfilebyIdquery, id);
    return userRows;


}