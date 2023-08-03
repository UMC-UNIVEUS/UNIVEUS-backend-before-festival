import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response} from "../../../config/response";
import {retrievePost} from "../post/postProvider";
import {retrieveComment, retrieveOneComment} from "./commProvider";
import {createComment, removeComment} from "./commService";
import {getUserIdByEmail} from "../user/userProvider";

/**
 * API name : 댓글 조회 (게시글의 모든 댓글 조회)
 * GET: /comments/{post_id}
 */
export const getComment = async(req, res) => {
	
    const {post_id} = req.params;
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
};

/**
 * API name : 댓글 개별 조회 
 * GET: /comments/one_comment/{comments_id}
 */
 export const getOneComment = async(req, res) => {
	
    const {comments_id} = req.params;
    const Comment = await retrieveOneComment(comments_id); 
    
    if(Comment[0]){ // Comment가 존재한다면
        return res.status(200).json(response(baseResponse.SUCCESS, Comment));
    }
    else{
        return res.status(404).json(response(baseResponse.COMMENT_COMMENTID_NOT_EXIST))
    }
};

/**
 * API name : 댓글 작성
 * POST: /comments/{post_id}
 */
export const postComment = async(req, res) => {

    const {post_id} = req.params;
    const {contents} = req.body; 
    const userEmail = req.verifiedToken.userEmail;
    const user_id = await getUserIdByEmail(userEmail); //토큰을 통한 이메일로 유저 id 구하기

    if(contents.length > 50){
        return res.status(400).json(errResponse(baseResponse.COMMENT_COMMENT_LENGTH));
    }

    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const postCommentResult = await createComment(post_id, user_id, contents);
        return res.status(200).json(response(baseResponse.SUCCESS, postCommentResult));
    }
    else{
        return res.status(404).json(response(baseResponse.POST_POSTID_NOT_EXIST))
    }   
};

/**
 * API name : 댓글 삭제
 * DELETE: /comments/{comments_id}
 */
export const deleteComment = async(req, res) => {
    
    const {comments_id} = req.params;
    const Comment = await retrieveOneComment(comments_id); 

    if(Comment[0]){ // Comment가 존재한다면
        const deleteCommentResult = await removeComment(comments_id);
        return res.status(200).json(response(baseResponse.SUCCESS, deleteCommentResult));
    }
    else{
        return res.status(404).json(response(baseResponse.COMMENT_COMMENTID_NOT_EXIST))
    }
};