import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response, errResponse } from "../../../config/response";
import { retrievePost} from "../post/postProvider";
import { retrieveComment} from "./commProvider";

/**
 * API name : 댓글 조회
 * GET: /comments/{post_id}
 */
export const getComment = async(req, res) => {
	
    const {post_id} = req.params;

    try{
       const Post = await retrievePost(post_id); 
       

       if(Post){ // Post가 존재한다면
        const Comment = await retrieveComment(post_id); 
       
        if(Comment[0]){ // Comment가 존재한다면
            
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
 * API name : 댓글 작성
 * POST: /comments/{post_id}
 */

export const postComment = async(req, res) => {
   
};

/**
 * API name : 댓글 삭제
 * DELETE: /comments/{comments_id}
 */
export const deleteComment =  async(req, res) => {
	
};