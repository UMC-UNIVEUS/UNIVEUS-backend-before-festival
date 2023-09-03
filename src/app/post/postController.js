import dotenv from "dotenv";
dotenv.config();
import {baseResponse, response, errResponse} from "../../../config/response";
import { retrievePost, retrieveParticipant, retrieveParticipantList} from "./postProvider";
import { createPost, editPost, removePost, addScrap, addLike, 
    applyParticipant, registerParticipant, refuseParticipant,
    addOneDayAlarm, applyUniveus,closeUniveus, inviteOneParticipant
    ,changePostStatus, removeParticipant,changeStatus } from "./postService";
import {getUserIdByEmail, getUserByNickName} from "../user/userProvider";
import {sendMessageAlarm, sendInviteMessageAlarm, sendCancelMessageAlarm} from "../user/userController"

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
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))
    }  
};

/**
 * API name : 게시글 작성 >> 넘어온 데이터 형식에 따라 모임, 마감 시간 저장할 방식 수정해야 함
 * POST: /post
 */
export const postPost = async(req, res) => {
    
    const {category, limit_gender, limit_people, location, meeting_date, openchat, 
        end_date, title, content } = req.body; // 축제용 >> limit_gender
    const notNull = [category, meeting_date, end_date, location, openchat] // 빠지면 안될 정보들
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID 

    if(!notNull){// 축제용 조건문
        return res.status(400).json(errResponse(baseResponse.POST_INFORMATION_EMPTY));
    }
    if(category != 4){ // 축제용 조건문
        return res.status(400).json(errResponse(baseResponse.POST_CATEGORY_LIMIT));
    }    
    if(limit_people != 4 && limit_people != 6){ // 축제용 조건문
        return res.status(400).json(errResponse(baseResponse.POST_PEOPLE_LIMIT));
    }    
    if(location.length > 24){
        return res.status(400).json(errResponse(baseResponse.POST_LOCATION_LENGTH));
    }    
    if(title.length > 48){ 
        return res.status(400).json(errResponse(baseResponse.POST_TITLE_LENGTH));
    }
    if(content.length > 500){ // 축제용 조건문
        return res.status(400).json(errResponse(baseResponse.POST_CONTENT_LENGTH));
    }
    const postPostResult = await createPost(userIdFromJWT, category, limit_gender, limit_people, location, meeting_date, openchat, 
        end_date, title, content);
    
    return res.status(200).json(response(baseResponse.SUCCESS, postPostResult));
};

/**
 * API name : 게시글 수정
 * PATCH: /post/{post_id} 
 */
export const patchPost =  async(req, res) => {

    const {post_id} = req.params;
    const {user_id, category, limit_gender,limit_people, location, meeting_date, openchat, 
        end_date, title,content} = req.body;
    const notNull = [category, meeting_date, end_date, location, openchat] // 빠지면 안될 정보들
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID 
    
    if(user_id == userIdFromJWT){  //접속한 유저가 작성자라면
        const Post = await retrievePost(post_id); 
        if(Post){
            if(!notNull){// 축제용 조건문
                return res.status(400).json(errResponse(baseResponse.POST_INFORMATION_EMPTY));
            }
            if(category != 4){ // 축제용 조건문
                return res.status(400).json(errResponse(baseResponse.POST_CATEGORY_LIMIT));
            }    
            if(limit_people != 4 && limit_people != 6){ // 축제용 조건문
                return res.status(400).json(errResponse(baseResponse.POST_PEOPLE_LIMIT));
            }    
            if(location.length > 24){
                return res.status(400).json(errResponse(baseResponse.POST_LOCATION_LENGTH));
            }    
            if(title.length > 48){ 
                return res.status(400).json(errResponse(baseResponse.POST_TITLE_LENGTH));
            }
            if(content.length > 500){ // 축제용 조건문
                return res.status(400).json(errResponse(baseResponse.POST_CONTENT_LENGTH));
            }
            const patchPostResult = await editPost(category, limit_gender,limit_people, location, meeting_date, openchat, 
                end_date, title,content, post_id);   
            return res.status(200).json(response(baseResponse.SUCCESS, patchPostResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
        } 
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
    
};

/**
 * API name : 게시글 삭제
 * DELETE: /post/{post_id}
 */
export const deletePost =  async(req, res) => {

    const {post_id} = req.params;
    const {user_id} = req.body; // 작성자의 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID 
    
    if(user_id == userIdFromJWT){  //접속한 유저가 작성자라면
        const Post = await retrievePost(post_id); 
        if(Post){ 
            const deletePostResult = await removePost(post_id);
            return res.status(200).json(response(baseResponse.SUCCESS, deletePostResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))        
        }
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
};

/**
 * API name : 게시글 스크랩 >> 축제 때는 필요 X
 * PATCH: /post/{post_id}/scrap
 */
export const patchScrap = async(req, res) => {

    const {post_id} = req.params;
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); //토큰을 통한 이메일로 유저 id 구하기

    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면
        const addScrapResult = await addScrap(post_id, userIdFromJWT);   
        return res.status(200).json(response(baseResponse.SUCCESS, addScrapResult));
    } 
    else{ 
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))
    } 
};

/**
 * API name : 게시글 좋아요 >> 축제 때는 필요 X
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
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))
    } 
};

/**
 * API name : 게시글 참여 신청 + 참여 신청 알람(to 작성자)
 * POST: /post/{post_id}/participant/apply
 */
export const postParticipant = async(req, res) => {
    
    const {post_id} = req.params;
    const {user_id} = req.body;// 작성자 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (신청자 ID 여야 함)
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면 
        const postParticipantResult = await applyParticipant(post_id, userIdFromJWT, user_id);
        return res.status(200).json(response(baseResponse.SUCCESS, postParticipantResult));
    } 
    else{ 
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))
    }
};

/**
 * API name  게시글 참여자 신청 내역 조회 
 * GET: /post/{post_id}/participant
 */
export const getParticipant = async(req, res) => {
	
    const {post_id} = req.params;
    const {user_id} = req.body; // 작성자 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (작성자 ID 여야 함)
    
    if(user_id == userIdFromJWT){ //접속한 유저가 작성자라면
        const Post = await retrievePost(post_id); 

        if(Post){ 
            const getParticipantList = await retrieveParticipantList(post_id); 
            return res.status(200).json(response(baseResponse.SUCCESS, getParticipantList));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
        }  
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
};

/**
 * API name : 게시글 참여자 승인 + 참여 승인 알람(to 참여자)
 * PATCH: /post/{post_id}/participant/register
 */
export const patchParticipant = async(req, res) => {
    
    const {post_id} = req.params;
    const {participant_id, user_id} = req.body;// 참여 테이블 ID, 작성자의 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (작성자 ID 여야 함)
    
    if(user_id == userIdFromJWT){
        const Post = await retrievePost(post_id); 
        if(Post){
            const patchParticipantResult = await registerParticipant(post_id, participant_id);
            return res.status(200).json(response(baseResponse.SUCCESS, patchParticipantResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
        }
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
};

/**
 * API name : 게시글 참여자 거절 + 참여 거절 알람(to 참여자)
 * DELETE: /{post_id}/participant/refuse
 */
export const deleteParticipant = async(req, res) => {
    
    const {post_id} = req.params;
    const {participant_id, user_id} = req.body;
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (작성자 ID 여야 함)
    
    const Post = await retrievePost(post_id); 
    
    if(user_id == userIdFromJWT){
        if(Post){ 
            const deleteParticipantResult = await refuseParticipant(post_id, participant_id);
            return res.status(200).json(response(baseResponse.SUCCESS, deleteParticipantResult));
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
        }
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
};

/**
 * API name : 모집 마감으로 상태 변경
 * POST: post/{post_id}/status
 */
export const patchStatus = async(req, res) => {

    const {post_id} = req.params;
    const {user_id} = req.body; // 작성자 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (작성자 ID 여야 함)
    const Post = await retrievePost(post_id); 
   
    if(user_id == userIdFromJWT){
        if(Post){ // Post가 존재한다면
            if(Post.post_status == 'end'){
                return res.status(400).json(errResponse(baseResponse.POST_PARTICIPATE_ALREADY_CLOSE))
            }
            else{
                const changeStatusResult = await changeStatus(post_id);   
                return res.status(200).json(response(baseResponse.SUCCESS, changeStatusResult));
            }
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST))
        } 
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
};

/**
 * API name : 게시글 모임 1일 전 알림 
 * POST: post/{post_id}/participant/onedayalarm
 */
export const postOneDayAlarm = async(req, res) => {
    
    const {post_id} = req.params;
    const {user_id} = req.body;// 참여자 ID들을 다 받아와야 함 >> 보류
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ 
        const postOneDayAlarmResult = await addOneDayAlarm(post_id, user_id);
        return res.status(200).json(response(baseResponse.SUCCESS, postOneDayAlarmResult));
    } 
    else{ 
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
    }
};


/**
 * API name : 유니버스 참여 + 모집 자동 마감 + 각각 알림 >> 축제용 API
 * POST: /post/{post_id}/participant
 */
export const participateUniveus = async(req, res) => {
    
    const {post_id} = req.params;
    const {user_id,limit_people,participant_userIDsFromDB} = req.body;// 작성자 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (신청자 ID 여야 함)
    
    const Post = await retrievePost(post_id); 

    if(Post){ // Post가 존재한다면 
        if(participant_userIDsFromDB.includes(userIdFromJWT)){ // 이미 참여한 유저라면
            return res.status(400).json(errResponse(baseResponse.POST_PARTICIPATION_OVERLAP));
        }
        else{ // 처음 참여하는 유저라면
            if(limit_people <= Post.current_people){ // 현재 참여 인원 수와 제한 인원 수가 같다면 모집 마감되었다고 응답
                return res.status(400).json(errResponse(baseResponse.POST_PARTICIPATION_CLOSE));
            }
            else if(limit_people == Post.current_people + 1){ // 현재 참여할 인원 수와 제한 인원 수가 같다면
                await applyUniveus(post_id, userIdFromJWT, user_id);// 게시글 참여
                await closeUniveus(post_id,user_id); // 게시글의 상태를 모집 마감으로 업데이트
                await sendMessageAlarm(user_id,2); // 2. 유니버스 마감 알림 (to 작성자)

                return res.status(200).json(response(baseResponse.POST_PARTICIPATION_CLOSE_NOW));
            }
            else{// 정상적인 참여
                const participateUniveusResult = await applyUniveus(post_id, userIdFromJWT, user_id);// 게시글 참여
                await sendMessageAlarm(user_id,1); // 1. 유니버스 참여 알림 (to 작성자)
                return res.status(200).json(response(baseResponse.SUCCESS, participateUniveusResult));
            }  
        }
    } 
    else{ 
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
    }
};

/**
 * API name : 유니버스 참여자 초대 >> 축제용 API 
 * POST: /post/{post_id}/participant/invite
 */
export const inviteParticipant= async(req, res) => {
    
    const {post_id} = req.params;
    const {user_id,participant_userNickNames,limit_people} = req.body;// 작성자 ID, 참여자 닉네임들(배열로 여러 개 받아옴), 제한 인원
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (신청자 ID 여야 함)

    if(user_id == userIdFromJWT){
        const Post = await retrievePost(post_id); 

        if(Post){ // Post가 존재한다면  
            if(participant_userNickNames.length == 0 || participant_userNickNames == null){ // 아무도 초대하지 않았는데 초대하기 눌렀을 때 >> 이 부분 프론트에서 넘겨주는 방식에 따라 다르게 고쳐야 함
                return res.status(400).json(errResponse(baseResponse.POST_INVITE_EMPTY)); 
            }
            else if(limit_people == 4){ 
                if(participant_userNickNames.length == 1){ // 초대 가능 인원 수는 1명
                    const userByNickName = await getUserByNickName(participant_userNickNames[0]); // 닉네임으로 유저 전체 정보 얻기
             
                    if(userByNickName){// 초대 받은 유저가 존재할 때
                        await inviteOneParticipant(post_id, userByNickName.user_id, user_id);
                        await sendInviteMessageAlarm(userByNickName.user_id,post_id); // 초대 알림 (to 초대 받은 사람)
                        return res.status(200).json(response(baseResponse.POST_PARTICIPATE_ONE)); // 성공
                    }
                    else{
                        return res.status(400).json(errResponse(baseResponse.USER_USERID_NOT_EXIST));            
                    }
                }
                else{
                    return res.status(400).json(errResponse(baseResponse.POST_PARTICIPATE_ONLY_ONE));            
                }
            }
            else if(limit_people == 6){
                if(participant_userNickNames.length == 2){ // 초대 가능 인원 수는 2명
                    const userByNickName1 = await getUserByNickName(participant_userNickNames[0]); 
    
                    if(userByNickName1){
                        const userByNickName2 = await getUserByNickName(participant_userNickNames[1]); 
    
                        if(userByNickName2){
                            await inviteOneParticipant(post_id, userByNickName1.user_id, user_id);
                            await inviteOneParticipant(post_id, userByNickName2.user_id, user_id);
                            await sendInviteMessageAlarm(userByNickName1.user_id,post_id); // 첫 번째 유저에게 초대 알림 
                            await sendInviteMessageAlarm(userByNickName2.user_id,post_id); // 두 번째 유저에게 초대 알림 
                            return res.status(200).json(response(baseResponse.POST_PARTICIPATE_TWO)); // 성공
                        }
                        else{
                            return res.status(400).json(errResponse(baseResponse.USER_SECOND_NOT_EXIST));            
                        }
                    }
                    else{
                        return res.status(400).json(errResponse(baseResponse.USER_FIRST_NOT_EXIST));            
                    }
                }
                else{
                    return res.status(400).json(errResponse(baseResponse.POST_PARTICIPATE_ONLY_TWO));            
                }
            }
        } 
        else{ 
            return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
        }
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }
};

/**
 * API name : 유니버스 참여 취소 (축제용)
 * DELETE: /post/{post_id}/participant/cancel
 */
export const cancelParticipant = async(req, res) => {
    
    const {post_id} = req.params;
    const {user_id,participant_userIDsFromDB} = req.body;// 작성자 ID, 참여한 유저 ID들
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 토큰을 통해 얻은 유저 ID (신청자 ID 여야 함)
    
    const Post = await retrievePost(post_id); 
    
    if(Post){ // Post가 존재한다면 
        if(participant_userIDsFromDB.includes(userIdFromJWT)){ // 참여를 했던 유저라면

            if(Post.post_status =="end"){// 모집 마감이라면
                await changePostStatus(post_id);// 모집 중으로 변경
            }
            const removeParticipantResult = await removeParticipant(post_id, userIdFromJWT, user_id);// 유니버스 참여 취소 
            await sendCancelMessageAlarm(user_id, userIdFromJWT); // 참여 취소 알림 (to 작성자)
            return res.status(200).json(response(baseResponse.SUCCESS, removeParticipantResult));
        }
        else{ // 참여를 하지 않았던 유저라면 
            return res.status(400).json(errResponse(baseResponse.POST_PARTICIPATION_NOT_MATCH));
        }
    } 
    else{ 
        return res.status(404).json(errResponse(baseResponse.POST_POSTID_NOT_EXIST));
    }
};

export const postImage = async(req, res) => {
    if (!req.files) return res.send(errResponse(baseResponse.S3_ERROR));
    const fileResponse = new Array();
    for(let i = 0; i < req.files.length; i++) {
        fileResponse.push({pic_url : req.files[i].location});
    }
    if (!fileResponse) return res.send(errResponse(baseResponse.S3_ERROR));
    return res.send(response(baseResponse.SUCCESS, fileResponse));
};