/*데이터베이스와 상호작용하여 사용자 관련 기능을 수행
(CRUD에 해당하는 서버 로직 처리) */

import pool from "../../../config/database"
import { baseResponse, response, errResponse } from "../../../config/response";
import { insertPost, updatePost } from "./postDao";


export const createPost = async(user_id, category, limit_people, location, meeting_date, openchat, 
    end_date, post_status, title, content) =>{
    try{
        const insertPostParams =[user_id, category, limit_people, location, meeting_date, openchat, 
            end_date, post_status, title, content]; 
    
        const connection = await pool.getConnection(async conn => conn);
        const createpostResult = await insertPost(connection,insertPostParams);
        console.log(createpostResult);
        
        connection.release();
        
        return response(baseResponse.SUCCESS);
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};

export const editPost = async(category, limit_people, location, meeting_date, openchat, 
    end_date, post_status, title,content, post_id)=>{
        try{
            const updatePostParams =[category, limit_people, location, meeting_date, openchat, 
                end_date, post_status, title,content,post_id]; 
        
            const connection = await pool.getConnection(async conn => conn);
            const editPostResult = await updatePost(connection,updatePostParams); 
            console.log(editPostResult);
            
            connection.release();
            
            return response(baseResponse.SUCCESS);
        }
        catch(error){
            return errResponse(baseResponse.DB_ERROR)
        }
};
