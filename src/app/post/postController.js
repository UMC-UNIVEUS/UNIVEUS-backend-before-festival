import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response} from "../../../config/response";
import { retrievePost, retrieveParticipant} from "./postProvider";
import { createPost, editPost, removePost} from "./postService";

/**
 * API name : 게시글 조회(게시글 + 참여자 목록)
 * GET: /post/{post_id}
 */
export const getPost = async(req, res) => {
	
    const {post_id} = req.params;
    const Post = await retrievePost(post_id); 
    const Participant = await retrieveParticipant(post_id); 

    if(Post){ // Post가 존재한다면
        return res.status(200).json(response(baseResponse.SUCCESS, {Post,Participant}));
    } 
    else{ 
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
    }  
};

/**
 * API name : 게시글 작성
 * POST: /post
 */

export const postPost = async(req, res) => {
    
    const {user_id, category, limit_people, location, meeting_date, openchat, 
        end_date, post_status, title, content} = req.body;
    const postPostResult = await createPost(user_id, category, limit_people, location, meeting_date, openchat, 
        end_date, post_status, title, content);
    
    return res.status(200).json(response(baseResponse.SUCCESS, postPostResult));
};

/**
 * API name : 이미지 등록
 * PUT: /post/{post_id}/img 
 */
export const postImg = async(req, res) => {
    
};


/**
 * API name : 게시글 수정
 * PUT: /post/{post_id} 
 */
export const patchPost =  async(req, res) => {

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
};

/**
 * API name : 게시글 삭제
 * DELETE: /post/{post_id}
 */
export const deletePost =  async(req, res) => {

    const {post_id} = req.params;
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const deletePostResult = await removePost(post_id);
        return res.status(200).json(response(baseResponse.SUCCESS, deletePostResult));
    } 
    else{ 
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))        
    }
};