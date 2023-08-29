import pool from "../../../config/database"
import { selectPost, selectParticipant, selectParticipantList, selectParticipantNum, selectPostStatus, selectUniveUsNameById } from "./postDao";

export const retrievePost = async(post_id) =>{
    
    const connection = await pool.getConnection(async conn => conn);
    const postResult = await selectPost(connection,post_id);
    connection.release();

    return postResult[0];

};

export const retrieveParticipant = async(post_id)=>{
  
    const connection = await pool.getConnection(async conn => conn);
    const participantResult = await selectParticipant(connection,post_id);
    connection.release();

    return participantResult;
};

export const retrieveParticipantList = async(post_id)=>{ //게시글 참여자 신청 내역 조회 
  
    const connection = await pool.getConnection(async conn => conn);
    const participantResult = await selectParticipantList(connection,post_id);
    connection.release();

    return participantResult;
};

export const retrieveParticipantNum = async(post_id)=>{ // 참여자 수 조회 (축제용)
  
    const connection = await pool.getConnection(async conn => conn);
    const participantNumResult = await selectParticipantNum(connection,post_id);
    connection.release();
    return participantNumResult;
};

export const retrievePostStatus = async(post_id)=>{ // 게시글 모집 상태 조회 (축제용)
  
    const connection = await pool.getConnection(async conn => conn);
    const postStatusResult = await selectPostStatus(connection,post_id);
    connection.release();
    return postStatusResult;
};

export const getUniveUsNameById = async(post_id)=>{  // post_id로 게시글 제목 조회
  
    const connection = await pool.getConnection(async conn => conn);
    const UniveUsNameByIdResult = await selectUniveUsNameById(connection,post_id);
    connection.release();
    return UniveUsNameByIdResult;
};

