import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response, errResponse } from "../../../config/response";
import {retrievePost} from "../post/postProvider";
import {retrieveComment, retrieveOneComment} from "./commProvider";
import {createComment, removeComment} from "./commService";

/**
 * API name : 댓글 조회 (게시글의 모든 댓글 조회)
 * GET: /comments/{post_id}
 */
export const getComment = async(req, res) => {
	
    const {post_id} = req.params;

    try{
       const Post = await retrievePost(post_id); 
       
       if(Post){ // Post가 존재한다면
        const Comment = await retrieveComment(post_id); 
       
        if(Comment[0]){ // post에 Comment가 한 개라도 존재한다면
            
            return res.status(200).json(response(baseResponse.SUCCESS, Comment));
        }
        else{
            return res.status(404).json(response(baseResponse.COMMENT_COMMENTID_NOT_EXIST))
        }
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
 * API name : 댓글 개별 조회 
 * GET: /comments/one_comment/{comments_id}
 */
 export const getOneComment = async(req, res) => {
	
    const {comments_id} = req.params;

    try{
        const Comment = await retrieveOneComment(comments_id); 
       
        if(Comment[0]){ // Comment가 존재한다면
            return res.status(200).json(response(baseResponse.SUCCESS, Comment));
        }
        else{
            return res.status(404).json(response(baseResponse.COMMENT_COMMENTID_NOT_EXIST))
        }
    }
    catch(error){
       return res.status(500).json(errResponse(baseResponse.SERVER_ERROR));
    }
};

/**
 * API name : 댓글 작성
 * POST: /comments/{post_id}
 */
export const postComment = async(req, res) => {

        const {post_id} = req.params;
        const {user_id, contents} = req.body; //user_id(댓글 작성자)와 contents(댓글 내용)를 body로 받아옴
        try{
            const Post = await retrievePost(post_id); 
            
            if(Post){ // Post가 존재한다면
                const postCommentResult = await createComment(post_id, user_id, contents);
                
                return res.status(200).json(response(baseResponse.SUCCESS, postCommentResult));
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
 * API name : 댓글 삭제
 * DELETE: /comments/{comments_id}
 */
export const deleteComment = async(req, res) => {
    
        try{
            const {comments_id} = req.params;
            
            const deleteCommentResult = await removeComment(comments_id);
            return res.status(200).json(response(baseResponse.SUCCESS, deleteCommentResult));
        
        }
        catch(error){
            return res.status(500).json(errResponse(baseResponse.SERVER_ERROR));
        }
};