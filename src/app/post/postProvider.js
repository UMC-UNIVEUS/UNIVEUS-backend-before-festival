import pool from "../../../config/database"
import { selectPost, selectParticipant, selectParticipantList, selectParticipantNum } from "./postDao";

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

