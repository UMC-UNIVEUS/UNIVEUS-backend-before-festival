import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response, errResponse} from "../../../config/response";
import { retrievePost, retrieveParticipant} from "./postProvider";
import { createPost, createImg, editPost, removePost, addScrap, addLike, applyParticipant,registerParticipant } from "./postService";
import {getUserIdByEmail} from "../user/userProvider";

/**
 * API name : 게시글 조회(게시글 + 참여자 목록)
 * GET: /post/{post_id}
 */
export const getPost = async(req, res) => {
	
    const {post_id} = req.params;
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const Participant = await retrieveParticipant(post_id); 
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
    
    if(title.length > 48){
        return res.status(400).json(errResponse(baseResponse.POST_TITLE_LENGTH));
    }
    if(location.length > 24){
        return res.status(400).json(errResponse(baseResponse.POST_LOCATION_LENGTH));
    }
    
    const postPostResult = await createPost(user_id, category, limit_people, location, meeting_date, openchat, 
        end_date, post_status, title, content);
    
    return res.status(200).json(response(baseResponse.SUCCESS, postPostResult));
};

/**
 * API name : 게시글 수정
 * PATCH: /post/{post_id} 
 */
export const patchPost =  async(req, res) => {

    const {post_id} = req.params;
    const {category, limit_people, location, meeting_date, openchat, 
        end_date, post_status, title,content} = req.body;

    if(title.length > 48){ // 글자 수 제한 프론트에서 할 지 백엔드에서 할 지 정해야 함.
        return res.status(400).json(errResponse(baseResponse.POST_TITLE_LENGTH));
    }
    if(location.length > 24){
        return res.status(400).json(errResponse(baseResponse.POST_LOCATION_LENGTH));
    }
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const patchPostResult = await editPost(category, limit_people, location, meeting_date, openchat, 
            end_date, post_status, title,content, post_id);   
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

/**
 * API name : 게시글 스크랩
 * PATCH: /post/{post_id}/scrap
 */
export const patchScrap = async(req, res) => {

    const {post_id} = req.params;
    const userEmail = req.verifiedToken.userEmail;
    const user_id = await getUserIdByEmail(userEmail); //토큰을 통한 이메일로 유저 id 구하기

    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const addScrapResult = await addScrap(post_id, user_id);   
        return res.status(200).json(response(baseResponse.SUCCESS, addScrapResult));
    } 
    else{ 
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
    } 
};

/**
 * API name : 게시글 좋아요
 * PATCH: /post/{post_id}/like
 */
export const patchLike = async(req, res) => {

    const {post_id} = req.params;
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const addLikeResult = await addLike(post_id);   
        return res.status(200).json(response(baseResponse.SUCCESS, addLikeResult));
    } 
    else{ 
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
    } 
};

/**
 * API name : 게시글 참여 신청 + 참여 신청 알람(to 작성자)
 * POST: /post/{post_id}/participant/apply
 */
export const postParticipant = async(req, res) => {
    
    const {post_id} = req.params;
    const userEmail = req.verifiedToken.userEmail;
    const user_id = await getUserIdByEmail(userEmail); //참여 신청자의 user_id
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면 
        const postParticipantResult = await applyParticipant(post_id, user_id);// 두 번째 post_id는 작성자의 id를 알기 위함
        return res.status(200).json(response(baseResponse.SUCCESS, postParticipantResult));
    } 
    else{ 
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
    }
};

/**
 * API name : 게시글 참여자 등록 + 참여 승인 알람(to 참여자)
 * PATCH: /post/{post_id}/participant/register
 */
export const patchParticipant = async(req, res) => {
    
    const {post_id} = req.params;
    const userEmail = req.verifiedToken.userEmail;
    const user_id = await getUserIdByEmail(userEmail); //참여 신청자의 user_id
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면 
        const patchParticipantResult = await registerParticipant(post_id, user_id);
        return res.status(200).json(response(baseResponse.SUCCESS, patchParticipantResult));
    } 
    else{ 
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
    }
};