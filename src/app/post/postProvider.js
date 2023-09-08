import pool from "../../../config/database"
import { selectPost, selectParticipant, selectPostImages, selectParticipantList } from "./postDao";

export const retrievePost = async(post_id) =>{
    
    const connection = await pool.getConnection(async conn => conn);
    const postResult = await selectPost(connection,post_id);
    connection.release();

    return postResult[0];

};

export const retrievePostImages = async(post_id) =>{
    
    const connection = await pool.getConnection(async conn => conn);
    const selectPostImagesResult = await selectPostImages(connection,post_id);
    connection.release();

    return selectPostImagesResult;
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
