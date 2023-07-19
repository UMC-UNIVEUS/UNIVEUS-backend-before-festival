import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response, errResponse } from "../../../config/response";
import { retrievePost, retrieveParticipant} from "./postProvider";
import { createPost, editPost} from "./postService";

/**
 * API name : 게시글 조회(게시글 + 참여자 목록)
 * GET: /post/{post_id}
 */
export const getPost = async(req, res) => {
	
    const {params:{post_id}} = req;

    try{
       const Post = await retrievePost(post_id); 
       const Participant = await retrieveParticipant(post_id); 
       

       if(Post){ // Post가 존재한다면
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
 * POST: /post
 */

export const postPost = async(req, res) => {
    try{
        const {user_id, category, limit_people, location, meeting_date, openchat, 
            end_date, post_status, title, content} = req.body;
        
        const postPostResult = await createPost(user_id, category, limit_people, location, meeting_date, openchat, 
            end_date, post_status, title, content);
        
        return res.status(200).json(response(baseResponse.SUCCESS, postPostResult));
    }
    catch(error){
        return res.status(500).json(errResponse(baseResponse.SERVER_ERROR));
    }
};


/**3
 * API name : 게시글 수정
 * PUT: /post/{post_id}
 */
export const patchPost =  async(req, res) => {
	try{
        const {post_id} = req.params;
        const {category, limit_people, location, meeting_date, openchat, 
            end_date, post_status, title,content} = req.body;
        
        const patchPostResult = await editPost(category, limit_people, location, meeting_date, openchat, 
            end_date, post_status, title,content, post_id);   
        const Post = await retrievePost(post_id); 
        
        if(Post){ // Post가 존재한다면
            return res.status(200).json(response(baseResponse.SUCCESS, patchPostResult));
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
 * API name : 게시글 삭제
 * DELETE: /post/{post_id}
 */
export const deletePost =  async(req, res) => {
	
};