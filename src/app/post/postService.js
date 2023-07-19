/*데이터베이스와 상호작용하여 사용자 관련 기능을 수행
(CRUD에 해당하는 서버 로직 처리) */

import pool from "../../../config/database"
import {baseResponse, response, errResponse } from "../../../config/response";
import { insertPost } from "./postDao";


export const createPost = async(user_id, title, category, content, scrapes, location, meeting_date, 
    end_date, current_people, limit_people, openchat, post_status) =>{
    try{
        const insertPostParams =[user_id, title, category, content, scrapes, location, meeting_date, 
            end_date, current_people, limit_people, openchat, post_status]; // 이 부분에서 [] 가 {}로 바뀌면 Db에러가 발생함.
    
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
