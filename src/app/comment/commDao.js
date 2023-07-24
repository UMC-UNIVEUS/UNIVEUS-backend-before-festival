
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

export const insertComment = async(connection, insertPostParams) => {
    const postCommentQuery = `
        INSERT INTO comments(post_id, user_id, contents, created_at) 
        VALUES (?,?,?,now());
    `;

    const insertCommentRow = await connection.query(postCommentQuery, insertPostParams);
    return insertCommentRow;
};

export const eraseComment = async(connection, comments_id)=>{
    const deleteCommentQuery = `
        DELETE 
        FROM comments
        WHERE comments_id = ?;
    `;
    const deleteCommentRow = await connection.query(deleteCommentQuery, comments_id);
    return deleteCommentRow;
};