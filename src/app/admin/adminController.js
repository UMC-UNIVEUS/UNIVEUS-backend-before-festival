import { baseResponse, response, errResponse } from "../../../config/response";
import { isAdmin, getAllUsersInfo, reportsUser } from "./adminProvider"
import { changeStatusByAdmin, changeHiddenByAdmin, signUpByAdmin } from "./adminService"
import { retrievePost } from "../post/postProvider";
import { createPost, editPost, removePost } from "../post/postService";
import { changeUserStatus } from "../user/userService";
import { changeUserReportStatus } from "../report/reportService";

/** 모든 유저 정보 가져오기 */
export const getUsersInfo = async(req, res) => {

    const getAllUsersInfoResult = await getAllUsersInfo();

    return res.render('userInfo.ejs', { user : getAllUsersInfoResult });

    // return res.send(response(baseResponse.SUCCESS, getAllUsersInfoResult));
}

/** 임의 회원가입 */
export const adminSignUp = async(req, res) => {

    const userInfo =  req.body;

    const getAdminSignUpResult = await signUpByAdmin(userInfo);

    return res.send(response(baseResponse.SUCCESS));
}

/** 신고 유저 확인 */
// TODO : DAO, servcie 구현
export const userReports = async(req, res) => {

    const userReportsResult = await reportsUser();

    return res.render('userReports.ejs', { userReports : userReportsResult });
}

/** postReports 함수 */
// TODO : DAO, servcie 구현
export const postReports = async(req, res) => {

    const userInfo =  req.body;

    const getAdminSignUpResult = await signUpByAdmin(userInfo);

    return res.send(response(baseResponse.SUCCESS));
}

/**
 * API name : 게시글 작성 (관리자)
 * POST: admin/post
 */
export const postPostByAdmin = async(req, res) => {
    
    const {category, limit_gender, limit_people, location, meeting_date, openchat, 
        end_date, title, content } = req.body;
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (관리자 id) 

    if(!isAdmin(userEmail)){  
        return res.send(errResponse(baseResponse.NOT_ADMIN));
    }
    else{ //접속한 유저가 관리자라면
        const postPostByAdminResult = await createPost(userIdFromJWT, category, limit_gender, limit_people, location, meeting_date, openchat, 
             end_date, title, content);       
         return res.status(200).json(response(baseResponse.SUCCESS, postPostByAdminResult)); 
    }
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

/** 관리자 home 랜더링 */
export const adminHomePage = async(req, res) => {
    return res.render('index.ejs');
};

/** user 관리 home 랜더링 */
export const userHomePage = async(req, res) => {
    return res.render('user.ejs');
};

/** user 임의 회원가입 page 랜더링 */
export const adminSignUpPage = async(req, res) => {
    return res.render('signup.ejs');
};

/** userBlockPage 랜더링 */
export const adminUserBlockPage = async(req, res) => {
    return res.render('userBlock.ejs');
};

/** userBlock 해제 */
export const adminUserBlockFree = async(req, res) => {
    const userId = req.params.userId; 
    const reportedId = req.params.reportedId;
    const userBlockFreeResult = changeUserStatus(userId, 1);
    const changeUserReportResult = changeUserReportStatus(reportedId, 2);

    return res.send(response(baseResponse.SUCCESS));
}

/** userBlock 기능 수행 */
export const adminUserBlock = async(req, res) => {
    const blockDuration = parseInt(req.body.blockDuration);
    const userId = req.params.userId;
    const reportId = req.params.reportId;

    //blockDuration : 7(7일) 30(30일) 0(탈퇴) 1(정상)
    const changeUserStatusResult = await changeUserStatus(userId, blockDuration);

    //reportStatus : 0 확인 전, 1 block 중, 2 신고 처리 완료
    const chageUserReportStatusResult = await changeUserReportStatus(reportId, 1);

    return res.send(response(baseResponse.SUCCESS));
};

