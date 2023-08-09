/*posting 관련 데이터베이스, Query가 작성되어 있는 곳*/

export const selectPost = async(connection, post_id)=>{ // 게시글 조회
    const selectPostQuery = `
        SELECT title, category, scrapes, meeting_date, end_date, current_people, limit_people, openchat
        FROM post
        WHERE post_id = ?;
    `;
    const [PostRow] = await connection.query(selectPostQuery, post_id);
    return PostRow;
};

export const selectParticipant = async(connection, post_id)=>{ // 참여자 목록 조회
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


export const insertPost = async(connection, insertPostParams)=>{// 게시글 생성 + 게시글 참여자 테이블 생성
    const postPostQuery = `
        INSERT INTO post(user_id, category, current_people, limit_people, location, 
        meeting_date, openchat, end_date, title, 
        content, created_at) 
        VALUES (?,?,1,?,?, ?,?,?,?, ?,now());
    `;

    const postParticipantTableQuery = `
        INSERT INTO participant_users(user_id, post_id, status) 
        VALUES (?,?,"Writer");
    `;
    const insertPostRow = await connection.query(postPostQuery, insertPostParams);
    const postParticipantTableRow = await connection.query(postParticipantTableQuery, [insertPostParams[0],insertPostRow[0].insertId]); 
    //insertPostRow.insertId는 생성된 post의 post_id, insertPostParams[0]는 user_id
    return insertPostRow;
};

export const updatePost = async(connection, updatePostParams)=>{// 게시글 수정
    const patchPostQuery = `
        UPDATE post 
        SET category =?,
        limit_people =?,
        location =?, 
        meeting_date =?, 
        openchat =?, 
        end_date =?, 
        post_status =?, 
        title =?,
        content =?,
        updated_at = now()
        WHERE post_id =?;
    `;
    const updatePostRow = await connection.query(patchPostQuery, updatePostParams);
    return updatePostRow;
};

export const erasePost = async(connection, deletePostParams)=>{// 게시글 삭제
    const deletePostQuery = `
        DELETE 
        FROM post
        WHERE post_id = ?;
    `;
    const deletePostRow = await connection.query(deletePostQuery, deletePostParams);
    return deletePostRow;
};
 
export const insertScrap = async(connection, addScarpParams)=>{// 게시글 스크랩 수 증가 + post_scrapes 테이블 생성
    const addScrapQuery = `
        UPDATE post 
        SET scrapes = scrapes + 1
        WHERE post_id = ?;
    `;

    const postScrapTableQuery = `
        INSERT INTO post_scrapes(post_id, user_id) 
        VALUES (?,?);
    `;
    const updateScrapRow = await connection.query(addScrapQuery, addScarpParams[0]);
    const insertScrapTableRow = await connection.query(postScrapTableQuery, addScarpParams); // 여기 (postScrapTableQuery, post_id, user_id)처럼 인수를 3개 넘겨주면 에러남 

    return updateScrapRow;
};

export const insertLike = async(connection, post_id)=>{// 게시글 좋아요
    const addLikeQuery = `
        UPDATE post 
        SET likes = likes + 1
        WHERE post_id = ?;
    `;
    const insertLikeRow = await connection.query(addLikeQuery, post_id);
    return insertLikeRow;
};

export const insertParticipant = async(connection, insertParticipantParams)=>{// 게시글 참여 신청 + 참여 신청 알람(to 작성자)
    const postParticipantQuery = `
        INSERT INTO participant_users(post_id, user_id) 
        VALUES (?,?);
    `;

    const applyParticipantAlarmQuery = `
        INSERT INTO alarm(post_id, participant_id, user_id, alarm_type) 
        VALUES (?,?,?,"참여 신청 알람");
    `;

    const postParticipantRow = await connection.query(postParticipantQuery, insertParticipantParams);
    const applyParticipantAlarmRow = await connection.query(applyParticipantAlarmQuery, insertParticipantParams);
    return postParticipantRow;
};

export const selectParticipantList = async(connection, post_id)=>{ //참여자 신청 내역 조회
    const selectParticipantListQuery = `
        SELECT participant_users.participant_id, user.user_id, user.gender, 
        user.nickname, user.major, user.class_of, participant_users.status
        FROM participant_users
        INNER JOIN user
        ON participant_users.user_id = user.user_id
        WHERE post_id = ? AND status= "Waiting";
    `;
    const [selectParticipantListRow] = await connection.query(selectParticipantListQuery, post_id);
    return selectParticipantListRow;
};

export const updateParticipant = async(connection, insertParticipantParams)=>{// 게시글 참여자 승인 + 참여 승인 알람(to 참여자)
    const approveParticipantQuery = `
        UPDATE participant_users
        SET status = "Approved"
        WHERE participant_id= ?;
    `;
    
    const addCurrentPeopleQuery = `
        UPDATE post 
        SET current_people = current_people + 1
        WHERE post_id = ?;
    `;

    const addParticipantAlarmQuery = `
        INSERT INTO alarm(post_id, user_id, alarm_type) 
        VALUES (?,(SELECT user_id FROM participant_users WHERE participant_id = ?),"참여 승인 알람");
    `;
    const approveParticipantRow = await connection.query(approveParticipantQuery, insertParticipantParams[1]);
    const addCurrentPeopleRow = await connection.query(addCurrentPeopleQuery, insertParticipantParams[0]);
    const addParticipantAlarmRow = await connection.query(addParticipantAlarmQuery, insertParticipantParams);

    return addParticipantAlarmRow;
};