/** email로 is_admin 조회 */
export const selectIsAdminByUserEmail = async(connection, userEmail) => {
    const selectIsAdminByUserEmailQuery = `SELECT is_admin FROM user WHERE email_id = '${userEmail}'`;
    const [selectIsAdminByUserEmailRow] = await connection.query(selectIsAdminByUserEmailQuery, userEmail);

    return selectIsAdminByUserEmailRow[0];
};

export const selectUserInfoFromUser = async(connection) => {
    const selectAllFromUserQuery = `SELECT phone, nickname, class_of, major, email_id FROM user;`;
    const [selectAllFromUserRow] = await connection.query(selectAllFromUserQuery);

    return selectAllFromUserRow;
}