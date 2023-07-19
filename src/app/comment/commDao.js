
export const selectComment = async(connection, post_id) => {
    const selectCommentQuery = `
        SELECT user.gender, user.nickname, user.major, user.class_of,
        comments.contents, comments.created_at
        FROM comments
        INNER JOIN user
        ON comments.user_id = user.user_id
        WHERE post_id = ?;
    `;
    const [CommentRow] = await connection.query(selectCommentQuery, post_id);
    return CommentRow;
};