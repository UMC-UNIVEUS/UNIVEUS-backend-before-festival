import { baseResponse, errResponse, response } from "../../../config/response"
import axios from "axios";
import { createUser, insertRefreshToken, validEmailCheck } from "../user/userService";
import { isUser } from "./userProvider";
import jwt from "jsonwebtoken";



/**로그인 버튼 클릭 시 발생, 구글 인증페이지로 이동*/
export const login = async(req, res) => {
    const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:3000/user/login/redirect';

    try {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth';
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
        url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`
        url += '&response_type=code'
        url += '&scope=email profile'    
        res.redirect(url);
    } catch(err) {
        console.log(err)
    }
}

/**구글 로그인 후 회원이면 토큰 발급, 회원이 아니면 err 발송 */
export const loginRedirect = async(req, res) => {
    const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:3000/user/login/redirect';
    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

    try {
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
        try {
            const userEmail = resp2.data.email;   
            if (validEmailCheck(userEmail) == false) {
                return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
            }
            if (!await isUser(userEmail)) {
                res.send(errResponse(baseResponse.LOGIN_NOT_USER));
            }
            const accessToken = await jwt.sign({ userEmail : userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1m', issuer : 'univeus' });
            const refreshToken = await jwt.sign({ userEmail : userEmail }, process.env.REFRESH_TOKEN_SECRET, { expiresIn : '24days', issuer : 'univeus' });
            const insertRefreshTokenResult = await insertRefreshToken(refreshToken, userEmail);

            if (accessToken && refreshToken) {
                return res.send(response(baseResponse.SUCCESS,{ accessToken, refreshToken }));
            }
        } catch(err) {
            console.log(err)
        }
    } catch(err) {
        console.log(err);
    }
}





/**회원가입 */
export const signup = async(req, res) => {
    const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:3000/user/signup/redirect';
    try {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth';
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
        url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`;
        url += '&response_type=code';
        url += '&scope=email profile';
        res.redirect(url);
    } catch(err) {
        console.log(err)
    }
}

export const signupRedirect = async(req, res) => {
    const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:3000/user/signup/redirect';
    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

    try {
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
        try {
            const userEmail = resp2.data.email;   
            if (validEmailCheck(userEmail) == false) {
                return res.send(errResponse(baseResponse.SIGNUP_EMAIL_KYONGGI));
            }
            if (await isUser(userEmail)) {
                return res.send(errResponse(baseResponse.SIGNUP_EMAIL_DUPLICATE));
            }
            const signupResult = await createUser(userEmail);
            res.send(response(baseResponse.SUCCESS));
        } catch(err) {
            console.log(err)
        }
    } catch(err) {
        console.log(err);
    }
}

// export const authUser = (req, res) => {
//     try {
//         const { nickName, gender, major, studenId } = req.body;

//         if (typeof nickName == "undefined") return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));
//         if (typeof gender == "undefined") return res.send(errResponse(baseResponse.SIGNUP_GENDER_EMPTY));
//         if (typeof major == "undefined") return res.send(errResponse(baseResponse.SIGNUP_MAJOR_EMPTY));
//         if (typeof studenId == "undefined") return res.send(errResponse(baseResponse.SIGNUP_STUDENTID_EMPTY));

//         // 유저 본인인증 코드 작성

//     }catch(err) {
//         console.log(err);
//     }
// }
