import pool from "../../../config/database"
import { selectPost } from "./postDao";

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