import { isAdmin } from "./adminProvider";
import { baseResponse, response, errResponse } from "../../../config/response";
import { getAllUsersInfo } from "./adminProvider";
import { changeStatusByAdmin, changeHiddenByAdmin } from "./adminService"
import { retrievePost } from "../post/postProvider";
import { editPost, removePost } from "../post/postService";

export const getUsersInfo = async(req, res) => {
    const userEmail = req.verifiedToken.userEmail;

    if (!isAdmin(userEmail)) return res.send(errResponse(baseResponse.NOT_ADMIN));

    const getAllUsersInfoResult = await getAllUsersInfo();

    return res.send(response(baseResponse.SUCCESS, getAllUsersInfoResult));
};

/**
 * API name : 게시글 삭제 (관리자)
 * DELETE: admin/post/{post_id}
 */
export const deletePostByAdmin = async(req, res) => {

    const {post_id} = req.params;
    const userEmail = req.verifiedToken.userEmail;
  
    if(!isAdmin(userEmail)){  
        return res.send(errResponse(baseResponse.NOT_ADMIN));
    }
    else{ //접속한 유저가 관리자라면
        const Post = await retrievePost(post_id); 
        if(Post){ 
            const deletePostResult = await removePost(post_id);
            return res.status(200).json(response(baseResponse.SUCCESS, deletePostResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))        
        }
    }
};

/**
 * API name : 게시글 내용 수정 (관리자)
 * PATCH: admin/post/{post_id}
 */
export const patchPostByAdmin = async(req, res) => {

    const {post_id} = req.params;
    const {category, limit_gender,limit_people, location, meeting_date, openchat, 
        end_date, title,content} = req.body;
    const userEmail = req.verifiedToken.userEmail;

    if(!isAdmin(userEmail)){  
        return res.send(errResponse(baseResponse.NOT_ADMIN));
    }
    else{ //접속한 유저가 관리자라면
        const Post = await retrievePost(post_id); 
        if(Post){ 
            const patchPostResult = await editPost(category, limit_gender,limit_people, location, meeting_date, openchat, 
                end_date, title,content, post_id);   
            return res.status(200).json(response(baseResponse.SUCCESS, patchPostResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))        
        }
    }

};

/**
 * API name : 게시글 상태 변경 (관리자)
 * PATCH: admin/post/{post_id}/status
 */
export const patchStatusByAdmin = async(req, res) => {

    const {post_id} = req.params;
    const {post_status} = req.body;
    const userEmail = req.verifiedToken.userEmail;

    if(!isAdmin(userEmail)){  
        return res.send(errResponse(baseResponse.NOT_ADMIN));
    }
    else{ //접속한 유저가 관리자라면
        const Post = await retrievePost(post_id); 
        if(Post){ 
            const changeStatusByAdminResult = await changeStatusByAdmin(post_status, post_id);   
            return res.status(200).json(response(baseResponse.SUCCESS, changeStatusByAdminResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));   
        }
    }
};

/**
 * API name : 게시글 공개, 비공개 설정
 * PATCH: admin/post/{post_id}/hidden
 */
export const patchHiddenByAdmin = async(req, res) => {

    const {post_id} = req.params;
    const {hidden} = req.body;
    const userEmail = req.verifiedToken.userEmail;

    if(!isAdmin(userEmail)){  
        return res.send(errResponse(baseResponse.NOT_ADMIN));
    }
    else{ //접속한 유저가 관리자라면
        const Post = await retrievePost(post_id); 
        if(Post){ 
            const changeHiddenByAdminResult = await changeHiddenByAdmin(hidden, post_id);   
            return res.status(200).json(response(baseResponse.SUCCESS, changeHiddenByAdminResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));   
        }
    }
};