import pool from "../../../config/database"
import { selectComment } from "./commDao";

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