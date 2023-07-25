import pool from "../../../config/database"
import { selectPost, selectParticipant } from "./postDao";

export const retrievePost = async(post_id) =>{
    
    try{
        const connection = await pool.getConnection(async conn => conn);
        const postResult = await selectPost(connection,post_id);
    
        connection.release();
    
        return postResult[0];
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};

export const retrieveParticipant = async(post_id)=>{
    try{
        const connection = await pool.getConnection(async conn => conn);
        const participantResult = await selectParticipant(connection,post_id);
    
        connection.release();
    
        return participantResult;
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};


