import pool from "../../../config/database"
import { baseResponse, response, errResponse } from "../../../config/response";
import {insertComment, eraseComment} from "./commDao";


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

export const removeComment = async(comments_id)=>{
    try{
    
        const connection = await pool.getConnection(async conn => conn);
        const removeCommnentResult = await eraseComment(connection,comments_id); 
        console.log(`삭제된 댓글의 comments_id = ${comments_id}`);
        
        connection.release();
        
        return response(baseResponse.SUCCESS);
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};