/*데이터베이스와 상호작용하여 사용자 관련 기능을 수행
(CRUD에 해당하는 서버 로직 처리) */

import pool from "../../../config/database"
import { baseResponse, response } from "../../../config/response";
import { insertPost, insertImg, updatePost, erasePost, insertScrap, insertLike, insertParticipant, updateParticipant,deleteParticipant, insertUniveus } from "./postDao";

export const createPost = async(userIdFromJWT, category, limit_gender, limit_people, location, meeting_date, openchat, // 게시글 생성
    end_date, title, content) =>{
 
    const insertPostParams =[userIdFromJWT, category,limit_gender, limit_people, location, meeting_date, openchat, 
        end_date, title, content]; 

    const connection = await pool.getConnection(async conn => conn);
    const createpostResult = await insertPost(connection,insertPostParams);
    connection.release();
    
    return response(baseResponse.SUCCESS);
};

export const editPost = async(category, limit_gender,limit_people, location, meeting_date, openchat, // 게시글 수정
    end_date, post_status, title,content, post_id)=>{
  
    const updatePostParams =[category, limit_gender,limit_people, location, meeting_date, openchat, 
        end_date, post_status, title,content,post_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const editPostResult = await updatePost(connection,updatePostParams); 
    connection.release();
    
    return response(baseResponse.SUCCESS);

};

export const removePost = async(post_id)=>{// 게시글 삭제
        
    const connection = await pool.getConnection(async conn => conn);
    const removePostResult = await erasePost(connection,post_id); 
    connection.release();
    
    return response(baseResponse.SUCCESS);    
};

export const addScrap = async(post_id,userIdFromJWT)=>{// 게시글 스크랩

    const addScarpParams =[post_id, userIdFromJWT]; 

    const connection = await pool.getConnection(async conn => conn);
    const insertScrapResult = await insertScrap(connection, addScarpParams); 
    connection.release();
    
    return response(baseResponse.SUCCESS);

};


export const addLike = async(post_id)=>{// 게시글 좋아요

    const connection = await pool.getConnection(async conn => conn);
    const insertLikeResult = await insertLike(connection,post_id); 
    connection.release();
    
    return response(baseResponse.SUCCESS);

};

export const applyParticipant = async(post_id, userIdFromJWT, user_id) =>{// 게시글 참여 신청 + 참여 신청 알람(to 작성자)

    const insertParticipantParams =[post_id, userIdFromJWT, user_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const applyParticipantResult = await insertParticipant(connection,insertParticipantParams);
    connection.release();

    return response(baseResponse.SUCCESS);
};


export const registerParticipant = async(post_id, participant_id) =>{// 게시글 참여자 등록 + 참여 승인 알람(to 참여자)

    const updateParticipantParams =[post_id, participant_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const registerParticipantResult = await updateParticipant(connection,updateParticipantParams);
    connection.release();

    return response(baseResponse.SUCCESS);
};

export const refuseParticipant = async(post_id, participant_id) =>{// 게시글 참여자 거절 + 참여 거절 알람(to 참여자)

    const deleteParticipantParams =[post_id, participant_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const refuseParticipantResult = await deleteParticipant(connection,deleteParticipantParams);
    connection.release();

    return response(baseResponse.SUCCESS);
};

export const applyUniveus = async(post_id, userIdFromJWT, user_id) =>{// 유니버스 참여 (축제용)

    const applyUniveusParams =[post_id, userIdFromJWT, user_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const applyUniveusResult = await insertUniveus(connection,applyUniveusParams);
    connection.release();

    return response(baseResponse.SUCCESS);
};