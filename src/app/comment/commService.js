import { format } from "mysql2";
import pool from "../../../config/database"
import { baseResponse, response, errResponse } from "../../../config/response";
import {insertComment} from "./commDao";


export const createComment = async(post_id, user_id, contents) =>{
    
    try{
        const insertPostParams =[post_id, user_id, contents]; 
    
        const connection = await pool.getConnection(async conn => conn);
        const createCommentResult = await insertComment(connection,insertPostParams);
        console.log(createCommentResult);
        
        connection.release();
        
        return response(baseResponse.SUCCESS);
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};