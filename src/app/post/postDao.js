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

export const selectParticipant = async(connection, post_id)=>{
    const selectParticipantQuery = `
        SELECT user.gender, user.nickname, user.major, user.class_of  
        FROM participant_users
        INNER JOIN user
        ON participant_users.user_id = user.user_id
        WHERE post_id = ?;
    `;
    const [ParticipantRow] = await connection.query(selectParticipantQuery, post_id);
    return ParticipantRow;
};


export const insertPost = async(connection, insertPostInfoParams)=>{
        const postPostQuery = `
        INSERT INTO post (user_id, title, category, content, created_at, scrapes, location,
            meeting_date, end_date, current_people, limit_people, openchat, post_status) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);

    `;
    const [insertPostInfoRow] = await connection.query(postPostQuery, insertPostInfoParams);
    return insertPostInfoRow;
};
 