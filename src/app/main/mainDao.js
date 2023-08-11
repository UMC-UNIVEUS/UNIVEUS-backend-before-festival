
/** select 인기순 postList */
export const selectPopularPostList = async(connection, getPostParams) => {
    const selectPostListQuery = 
    `SELECT * FROM post WHERE category = ? ORDER BY likes DESC LIMIT ?, ?`;
    const [rows] = await connection.query(selectPostListQuery, getPostParams);

    return rows;
}

/** select 최신순 postList */
export const selectRecentlyPostList = async(connection, getPostParams) => {
    const selectPostListQuery = 
    `SELECT * FROM post WHERE category = ? ORDER BY created_at DESC LIMIT ?, ?`
    const [rows] = await connection.query(selectPostListQuery, getPostParams);

    return rows;
}

/** 카테고리 별 게시글 개수 세기 */
export const countPostsByCategory = async(connection, categoryParams) => {
    const countPostsQuery = 
    `SELECT COUNT(*) AS post_num FROM post WHERE category = ?;`
    const [rows] = await connection.query(countPostsQuery, categoryParams);

    return rows[0].post_num;
}