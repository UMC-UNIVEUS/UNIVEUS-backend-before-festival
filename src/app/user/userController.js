import { baseResponse, errResponse, response } from "../../../config/response";
import axios from "axios";
import { addUserProfileInfo, isKyonggiEmail, createAuthNum, checkAlarms, 
    createUser, addUserPhoneNumber } from "../user/userService";
import { isUser, isNicknameDuplicate, retrieveAlarms, getUserIdByEmail, 
    getUserNickNameById, isAuthNumber, isAuthUser, getUserById } from "./userProvider";
import { retrievePost } from "../post/postProvider";
import { retrievePost } from "../post/postProvider";
import jwt from "jsonwebtoken";
import { sendSMS } from "../../../config/NaverCloudClient";
import { naverCloudSensSecret } from "../../../config/configs";
import NodeCache from "node-cache";

const cache = new NodeCache();


/** 구글 로그인 APT */
export const login = async(req, res) => {
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const googleAccessToken = req.body.accessToken;

    console.log("googleAccessToken : " + googleAccessToken);

    const resUserInfo = await axios.get(GOOGLE_USERINFO_URL, {
      headers: {
          Authorization: `Bearer ${googleAccessToken}`,
      },
    });

    const userEmail = resUserInfo.data.email;  

    if (isKyonggiEmail(userEmail) == false) {
        return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
    }

    const accessToken = await jwt.sign({ userEmail : userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '100days', issuer : 'univeus' })    

    if(!accessToken) return res.send(errResponse(baseResponse.VERIFIED_ACCESS_TOKEN_EMPTY));
    
    if (!await isUser(userEmail)) {
        createUser(userEmail);
        console.log("univeus-access-token : " + accessToken);
        return res.send(response(baseResponse.LOGIN_NOT_USER, { accessToken }));
    }

    if (!await isAuthNumber(userEmail)) {
        console.log("univeus-access-token : " + accessToken);
        return res.send(response(baseResponse.LOGIN_NOT_AUTH_NUMBER, { accessToken }));
    }

    if (!await isAuthUser(userEmail)) {
        console.log("univeus-access-token : " + accessToken);
        return res.send(response(baseResponse.LOGIN_NOT_AUTH_COMPLETE_USER, { accessToken }));
    }

    console.log("univeus-access-token : " + accessToken);
    return res.send(response(baseResponse.SUCCESS,{ accessToken }));
}


/**회원가입 */
// export const signupRedirect = async(req, res) => {
//     const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:3000/user/signup/redirect';
//     const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
//     const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

//     const { code } = req.body;

//     const resAuthCode = await axios.post(GOOGLE_TOKEN_URL, {
//         code,
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
//         grant_type: 'authorization_code',
//     });

//     const resUserInfo = await axios.get(GOOGLE_USERINFO_URL, {
//         headers: {
//             Authorization: `Bearer ${resAuthCode.data.access_token}`,
//         },
//     });

//     const userEmail = resUserInfo.data.email;   

//     if (validEmailCheck(userEmail) == false) {
//         return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
//     }
//     if (await isUser(userEmail)) {
//         return res.send(errResponse(baseResponse.SIGNUP_EMAIL_DUPLICATE));
//     }
//     await createUser(userEmail);
//     res.send(response(baseResponse.SUCCESS));

// }



/** 인증번호 문자 전송 API */
export const sendAuthNumber = async(req, res) => {
    const to = req.body.phoneNumber;
    const sendAuth = createAuthNum();
    const content = `[UNIVEUS] 인증번호 [${sendAuth}]`;
    const { success } = await sendSMS(naverCloudSensSecret, { to, content });

    // 서버 캐시에 인증번호 및 유저 전화번호 임시 저장, 3분동안 유효
    cache.set("authNumber", sendAuth, 180);
    cache.set("userPhone", to, 180); 

    if (!success) {
        return res.send(errResponse(baseResponse.SEND_AUTH_NUMBER_MSG_FAIL));
    } 

    return res.send(response(baseResponse.SEND_AUTH_NUMBER_MSG))
}

/** 인증번호 검증 API */
export const verifyNumber = async(req, res) => {
    const userAuthNumber = req.body.number;
    const authNumber = cache.get("authNumber");
    const userPhone = cache.get("userPhone");

    if (authNumber == userAuthNumber) {
        const userId = await getUserIdByEmail(req.verifiedToken.userEmail);
        addUserPhoneNumber(userPhone, userId);

        cache.del("authNumber");
        cache.del("userPhone");
        
        return res.send(response(baseResponse.VERIFY_NUMBER_SUCCESS));
    }
    
    return res.send(errResponse(baseResponse.VERIFY_NUMBER_FAIL));
}

/** 유니버스 관련 문자 알림
 * 1. 참여 알림 (to 작성자)
 * 2. 마감 알림 (to 작성자)*/
export const sendMessageAlarm = async(user_id,alarmType) =>{ // 알림을 보낼 유저, 알림 type

    const User = await getUserById(user_id); 
    const to = User.phone;

    if(alarmType == 1){
        var content = `[UNIVEUS] 새로운 유저가 유니버스에 참여했습니다!`;
    }
    else if(alarmType == 2){
        var content = `[UNIVEUS] 유니버스가 모집 마감됐습니다!`;
    }

    const { success } = await sendSMS(naverCloudSensSecret, { to, content });
    if (!success) { return false} 
    else { return true}
};

/**초대 알림 (to 초대 받은 사람)*/
export const sendInviteMessageAlarm = async(user_id,post_id) =>{ // 알림을 보낼 유저

    const User = await getUserById(user_id); 
    const to = User.phone;
    
    const Post = await retrievePost(post_id); 
    const content = `[UNIVEUS] 유니버스 '${Post.title}'에 초대받으셨습니다! 들어가서 확인해 보세요!`;
    
    const { success } = await sendSMS(naverCloudSensSecret, { to, content });
    if (!success) { return false} 
    else { return true}
};

/** 참여 취소 알림 (to 작성자)*/
export const sendCancelMessageAlarm = async(user_id,userIdFromJWT) =>{ // 알림을 보낼 유저

    const User = await getUserById(user_id); 
    const to = User.phone;

    const userNickName = await getUserNickNameById(userIdFromJWT); // user_id로 닉네임 가져오기
    const content = `[UNIVEUS] 유니버스에 참여했던 '${userNickName}'님이/가 참여 취소하였습니다.`;

    const { success } = await sendSMS(naverCloudSensSecret, { to, content });
    if (!success) { return false} 
    else { return true}
};

/** 유저 신고 관련 알림 (to 관리자) */
export const sendUserReportAlarm = async(reportedBy,reportedUser) =>{ 

    const to = "01092185178"; // 일단 내번호로....
    const content = `[UNIVEUS 유저 신고] user_id = '${reportedBy}' >> user_id = '${reportedUser}'을 신고했습니다.`;

    const { success } = await sendSMS(naverCloudSensSecret, { to, content });
    if (!success) { return false} 
    else { return true}
};

/** 게시글 신고 관련 알림 (to 관리자) */
export const sendPostReportAlarm = async(reportedBy, reportedPost) =>{ 

    const to = "01092185178"; // 일단 내번호로....
    const content = `[UNIVEUS 게시글 신고] user_id = '${reportedBy}' >> post_id = '${reportedPost}'을 신고했습니다.`;

    const { success } = await sendSMS(naverCloudSensSecret, { to, content });
    if (!success) { return false} 
    else { return true}
};



/** 닉네임 중복 체크 API */
export const checkNickNameDuplicate = async (req, res) => {
    const nickname = req.body.nickname;
    // try {
        if (await isNicknameDuplicate(nickname)){
             return res.send(errResponse(baseResponse.NICK_NAME_DUPLICATE));
        }
        else {
            return res.send(response(baseResponse.SUCCESS));
        }
    // } catch(err) {
    //     res.send(errResponse(baseResponse.SERVER_ERROR));
    // }
}

/**유니버스 시작하기 API */
export const startUniveUs = async (req, res) => {

        if (typeof req.body.nickname == "undefined") return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));

        if (typeof req.body.gender == "undefined") return res.send(errResponse(baseResponse.SIGNUP_GENDER_EMPTY));

        if (typeof req.body.major == "undefined") return res.send(errResponse(baseResponse.SIGNUP_MAJOR_EMPTY));

        if (typeof req.body.studentId == "undefined") return res.send(errResponse(baseResponse.SIGNUP_STUDENTID_EMPTY));   
            

        const userEmail = req.verifiedToken.userEmail;
        const userInfo = { userInfo : req.body, userEmail : userEmail };


        if (isKyonggiEmail(userEmail) == false)  return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
        
        addUserProfileInfo(userInfo);

        return res.send(response(baseResponse.SUCCESS));
};

/**
 * API name : 알림 내역 조회
 * GET: /uesr/{user_id}/alarm
 */
export const getAlarms = async(req, res) => {
	
    const {user_id} = req.params; // 알림 받은 유저의 ID
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 접속 중인 유저 ID

    if(userIdFromJWT == user_id){
        const getAlarmsResult = await retrieveAlarms(userIdFromJWT); 
        return res.status(200).json(response(baseResponse.SUCCESS, getAlarmsResult));
    }
    else{
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    }  
};



/**
 * API name : 알림 확인 
 * PATCH: /uesr/{user_id}/alarm
 */
export const patchAlarms = async(req, res) => {

    const {user_id} = req.params; //알림을 확인하려는 유저 ID
    const {alarm_id} = req.body;
    const userEmail = req.verifiedToken.userEmail;
    const userIdFromJWT = await getUserIdByEmail(userEmail); // 접속 중인 유저 ID
    
    if(userIdFromJWT == user_id){
        const patchAlarmsResult = await checkAlarms(alarm_id);   
        return res.status(200).json(response(baseResponse.SUCCESS, patchAlarmsResult));
    } 
    else{ 
        return res.status(400).json(errResponse(baseResponse.USER_USERID_USERIDFROMJWT_NOT_MATCH));
    } 
};
