import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response, errResponse } from "../../../config/response";
import { retrievePost, retrieveParticipant} from "./postProvider";
import { createPost} from "./postService";

/**
 * API name : 게시글 조회(게시글 + 참여자 목록)
 * GET: /post/{post_id}
 */
export const getPost = async(req, res) => {
	
    const {params:{post_id}} = req;

    try{
       const Post = await retrievePost(post_id); 
       const Participant = await retrieveParticipant(post_id); 
       

       if(Post){
           return res.status(200).json(response(baseResponse.SUCCESS, {Post,Participant}));
       } 
       else{ 
           return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
       }
    }
    catch(error){
       return res.status(500).json(errResponse(baseResponse.SERVER_ERROR));
    }
};

/**
 * API name : 게시글 작성
 * POST: /post/{post_id}
 */

export const postPost = async(req, res) => {
    try{
        const {post_id, user_id, title,category,content,created_at,scrapes,location,
            meeting_date,end_date,current_people,limit_people,openchat,post_status} = req.body;
    
        const postPostResult = await createPost(post_id, user_id, title,category,content,created_at,scrapes,location,
            meeting_date,end_date,current_people,limit_people,openchat,post_status);
        
        return res.status(200).json(response(baseResponse.SUCCESS, postPostResult));
    }
    catch(error){
        return res.status(500).json(errResponse(baseResponse.SERVER_ERROR));
    }

};

/**
 * API name : 게시글 수정
 * PUT: /post/{post_id}
 */
export const updatePost =  async(req, res) => {
	
};

/**
 * API name : 게시글 삭제
 * DELETE: /post/{post_id}
 */
export const deletePost =  async(req, res) => {
	
};