import pool from "../../../config/database"
import { selectComment, selectOneComment } from "./commDao";

export const retrieveComment = async(post_id) => {
    
    try{
        const connection = await pool.getConnection(async conn => conn);
        const commentResult = await selectComment(connection,post_id);
    
        connection.release();
    
        return commentResult;
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};


export const retrieveOneComment = async(comments_id) => {
    
    try{
        const connection = await pool.getConnection(async conn => conn);
        const OneCommentResult = await selectOneComment(connection,comments_id);
    
        connection.release();
    
        return OneCommentResult;
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};