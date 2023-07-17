import baseResponse from "../../../config/baseResponseStatus"
import {response, errResponse} from "../../../config/response"
import axios from "axios";


/**로그인 */
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

export const loginRedirect = async(req, res) => {
    try {
        const { code } = req.query;
        console.log(`code : ${ code }`);
        return res.send(response(baseResponse.SUCCESS));
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
            // x-www-form-urlencoded(body)
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
            grant_type: 'authorization_code',
        });
        const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
            /**Request Header에 Authorization 추가*/ 
          headers: {
              Authorization: `Bearer ${resp.data.access_token}`,
          },
      });
      res.json(resp2.data);
    } catch(err) {
        console.log(err);
    }
}


