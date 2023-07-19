/*posting 관련 데이터베이스, Query가 작성되어 있는 곳*/

export const selectPost = async(connection, post_id)=>{
    const selectPostQuery = `
        SELECT title, category, scrapes, meeting_date, end_date, current_people, limit_people, openchat
        FROM post
        WHERE post_id = ?;
    `;
    const [PostRow] = await connection.query(selectPostQuery, post_id);
    return PostRow;
};