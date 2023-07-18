/*데이터베이스와 상호작용하여 사용자 관련 기능을 수행
(CRUD에 해당하는 서버 로직 처리) */

import pool from "../../../config/database"
import {baseResponse, response, errResponse } from "../../../config/response";
import { insertPost } from "./postDao";

export const createPost = async(post_id, user_id, title,category,content,created_at,scrapes,location,
    meeting_date,end_date,current_people,limit_people,openchat,post_status) =>{
    try{
        const insertPostInfoParams ={post_id, user_id, title,category,content,created_at,scrapes,location,
            meeting_date,end_date,current_people,limit_people,openchat,post_status};
    
        const connection = await pool.getConnection(async conn => conn);
        const createpostResult = await insertPost(connection,insertPostInfoParams);
    
        connection.release();
    
        return response(baseResponse.SUCCESS);
    }
    catch(error){
        return errResponse(baseResponse.DB_ERROR)
    }
};