/*데이터베이스와 상호작용하여 사용자 관련 기능을 수행
(CRUD에 해당하는 서버 로직 처리) */

import pool from "../../../config/database"
import { baseResponse, response } from "../../../config/response";
import { insertPost, insertImg, updatePost, erasePost, insertScrap, insertLike } from "./postDao";

export const createPost = async(user_id, category, limit_people, location, meeting_date, openchat, // 게시글 생성
    end_date, post_status, title, content) =>{
 
    const insertPostParams =[user_id, category, limit_people, location, meeting_date, openchat, 
        end_date, post_status, title, content]; 

    const connection = await pool.getConnection(async conn => conn);
    const createpostResult = await insertPost(connection,insertPostParams);
    connection.release();
    
    return response(baseResponse.SUCCESS);
};

export const editPost = async(category, limit_people, location, meeting_date, openchat, // 게시글 수정
    end_date, post_status, title,content, post_id)=>{
  
    const updatePostParams =[category, limit_people, location, meeting_date, openchat, 
        end_date, post_status, title,content,post_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const editPostResult = await updatePost(connection,updatePostParams); 
    connection.release();
    
    return response(baseResponse.SUCCESS);

};

export const removePost = async(post_id)=>{// 게시글 삭제
        
    const deletePostParams =[post_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const removePostResult = await erasePost(connection,deletePostParams); 
    connection.release();
    
    return response(baseResponse.SUCCESS);    
};

export const addScrap = async(post_id,user_id)=>{// 게시글 스크랩

    const addScarpParams =[post_id, user_id]; 

    const connection = await pool.getConnection(async conn => conn);
    const insertScrapResult = await insertScrap(connection, addScarpParams); 
    connection.release();
    
    return response(baseResponse.SUCCESS);

};


export const addLike = async(post_id)=>{// 게시글 좋아요

    const connection = await pool.getConnection(async conn => conn);
    const insertLikeResult = await insertLike(connection,post_id); 
    connection.release();
    
    return response(baseResponse.SUCCESS);

};