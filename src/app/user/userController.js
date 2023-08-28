import { baseResponse, errResponse, response } from "../../../config/response";
import axios from "axios";
import { createUser, insertRefreshToken, validEmailCheck, createAuthNum, authUser, checkAlarms } from "../user/userService";
import { isUser, isNicknameDuplicate, retrieveAlarms, getUserIdByEmail, getPhonNumById } from "./userProvider";
import jwt from "jsonwebtoken";
import { sendSMS } from "../../../config/NaverCloudClient";
import { naverCloudSensSecret } from "../../../config/configs";
import NodeCache from "node-cache";

const cache = new NodeCache();



/**로그인 버튼 클릭 시 발생, 구글 인증페이지로 이동*/
export const login = async(req, res) => {
    const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:3000/user/login/redirect';

    // try {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth';
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
        url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`
        url += '&response_type=code'
        url += '&scope=email profile'    
        res.redirect(url);
    // } catch(err) {
    //     console.log(err)
    // }
}

/**구글 로그인 후 회원이면 토큰 발급, 회원이 아니면 err 발송 */
export const loginRedirect = async(req, res) => {
    const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:3000/user/login/redirect';
    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

    // try {
        const { code } = req.query;
        console.log(`code : ${ code }`);
        const resp = await axios.post(GOOGLE_TOKEN_URL, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_LOGIN_REDIRECT_URI,
            grant_type: 'authorization_code',
        });
        const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
          headers: {
              Authorization: `Bearer ${resp.data.access_token}`,
          },
      });
        // try {
            const userEmail = resp2.data.email;   
            if (validEmailCheck(userEmail) == false) {
                return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
            }
            if (!await isUser(userEmail)) {
                res.send(errResponse(baseResponse.LOGIN_NOT_USER));
            }
            const accessToken = await jwt.sign({ userEmail : userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '24days', issuer : 'univeus' });
            // const refreshToken = await jwt.sign({ userEmail : userEmail }, process.env.REFRESH_TOKEN_SECRET, { expiresIn : '24days', issuer : 'univeus' });
            // const insertRefreshTokenResult = await insertRefreshToken(refreshToken, userEmail);

            if (accessToken /*&& refreshToken*/) {
                return res.send(response(baseResponse.SUCCESS,{ accessToken/*, refreshToken */}));
            }
        // } catch(err) {
        //     console.log(err)
        // }
    // } catch(err) {
    //     console.log(err);
    // }
}





/**회원가입 */
export const signup = async(req, res) => {
    const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:3000/user/signup/redirect';
    // try {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth';
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
        url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`;
        url += '&response_type=code';
        url += '&scope=email profile';
        res.redirect(url);
    // } catch(err) {
    //     console.log(err)
    // }
}

export const signupRedirect = async(req, res) => {
    const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:3000/user/signup/redirect';
    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

    // try {
        const { code } = req.query;
        console.log(`code : ${ code }`);
        const resp = await axios.post(GOOGLE_TOKEN_URL, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
            grant_type: 'authorization_code',
        });
        const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
          headers: {
              Authorization: `Bearer ${resp.data.access_token}`,
          },
      });
        // try {
            const userEmail = resp2.data.email;   
            if (validEmailCheck(userEmail) == false) {
                return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
            }
            if (await isUser(userEmail)) {
                return res.send(errResponse(baseResponse.SIGNUP_EMAIL_DUPLICATE));
            }
            const signupResult = await createUser(userEmail);
            res.send(response(baseResponse.SUCCESS));
    //     } catch(err) {
    //         console.log(err)
    //     }
    // } catch(err) {
    //     console.log(err);
    // }
}



/** 인증번호 문자 전송 API */
export const sendAuthNumber = async(req, res) => {
    const to = req.body.phoneNumber;
    const sendAuth = createAuthNum();
    const content = `[UNIVEUS] 인증번호 [${sendAuth}]`;
    const { success } = await sendSMS(naverCloudSensSecret, { to, content });
    // 서버 캐시에 인증번호 임시 저장, 5분동안 유효
    cache.set("authNumber", sendAuth, 300);
    if (!success) {
        res.send(errResponse(baseResponse.SEND_AUTH_NUMBER_MSG_FAIL));
    } else {
        res.send(response(baseResponse.SEND_AUTH_NUMBER_MSG))
    };
}

/** 인증번호 검증 API */
export const verifyNumber = (req, res) => {
    const number = req.body.number;
    const authNumber = cache.get("authNumber");
    if (authNumber == number) {
        cache.del("authNumber");
        res.send(response(baseResponse.VERIFY_NUMBER_SUCCESS));
    }
    else {
        res.send(errResponse(baseResponse.VERIFY_NUMBER_FAIL));
    }

}

/** 유니버스 참여 알림 (to 작성자)*/
export const sendParticipateAlarm = async(user_id) =>{ // 작성자 ID를 받아옴

    const writerPhoneNum = await getPhonNumById(user_id); // user_id로 전화번호 가져오기
    console.log("writerPhoneNum = "+ writerPhoneNum);
    const content = `[UNIVEUS] 새로운 유저가 유니버스에 참여했습니다!`;
    const { success } = await sendSMS(naverCloudSensSecret, { writerPhoneNum, content });
   // console.log("success =" + success);
    if (!success) {
        return false;
    } else {
        return true;
    };

};

/** 유니버스 마감 알림 (to 작성자)*/
export const sendEndAlarm = async(user_id, res) =>{ // 작성자 ID를 받아옴

    const {writerPhoneNum} = await getPhonNumById(user_id, res); // user_id로 전화번호 가져오기
    const content = `[UNIVEUS] 유니버스가 마감되었습니다!`;
    const { success } = await sendSMS(naverCloudSensSecret, { writerPhoneNum, content });
    console.log("success =" + success);
    if (!success) {
        return false;
    } else {
        return true;
    };


};

/** 유니버스 초대 알림 (to 초대 받은 사람)*/


/** 유니버스 참여 취소 알림 (to 작성자)*/


/**닉네임 중복 체크 API */
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
export const startUniveUs = (req, res) => {
    // try {
        if (typeof req.body.phone == "undefined") return res.send(errResponse(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));

        if (typeof req.body.nickname == "undefined") return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));

        if (typeof req.body.gender == "undefined") return res.send(errResponse(baseResponse.SIGNUP_GENDER_EMPTY));

        if (typeof req.body.major == "undefined") return res.send(errResponse(baseResponse.SIGNUP_MAJOR_EMPTY));

        if (typeof req.body.studentId == "undefined") return res.send(errResponse(baseResponse.SIGNUP_STUDENTID_EMPTY));   
            
            /** 토큰에서 userEmail 추출 */
            const userEmail = req.verifiedToken.userEmail;
            const user = { userInfo : req.body, userEmail : userEmail};
        
        // try {
            authUser(user);
            return res.send(response(baseResponse.SUCCESS));
        // } catch(err) {
            // return res.send(errResponse(baseResponse.SERVER_ERROR));
        // }

    // }catch(err) {
    //     return res.send(errResponse(baseResponse.SERVER_ERROR));
    // }
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