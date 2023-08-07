import pool from "../../../config/database"
import { baseResponse, response } from "../../../config/response";
import {insertComment, eraseComment} from "./commDao";


export const createComment = async(post_id, userIdFromJWT, contents) =>{

    const insertPostParams =[post_id, userIdFromJWT, contents]; 
    const connection = await pool.getConnection(async conn => conn);
    const createCommentResult = await insertComment(connection,insertPostParams);
    connection.release();
    
    return response(baseResponse.SUCCESS);
};

export const removeComment = async(comments_id)=>{
  
    const connection = await pool.getConnection(async conn => conn);
    const removeCommnentResult = await eraseComment(connection,comments_id); 
    console.log(`삭제된 댓글의 comments_id = ${comments_id}`);
    connection.release();
    
    return response(baseResponse.SUCCESS);
};