import jwt from "jsonwebtoken";
import { baseResponse, errResponse } from "./response"


/** jwt 미들웨어 */
export const jwtMiddleware = (req, res, next) =>{
    /** 헤더에서 토큰 추출 */
    const token = req.headers['x-access-token']

    console.log(req.headers);
    console.log(req.headers['x-access-token'])
    console.log("토큰 존재 확인 : " + token);

    // token does not exist
    if(!token) {
        return res.send(errResponse(baseResponse.TOKEN_EMPTY))
    }

    /** 토큰 검증 */
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, verifiedToken) => {

                console.log("토큰 검증 : " + req.verifiedToken);

                if(err) reject(err);
                resolve(verifiedToken)
            })
        }
    );

    /** 토큰 검증 실패 시 오류 발생*/
    const onError = (error) => {

        console.log("토큰 검증 오류 : " + req.verifiedToken);

        return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE))
    };
    /** 토큰 검증 성공 */
    p.then((verifiedToken) => {

        console.log("토큰 검증 성공 : " + req.verifiedToken);

        req.verifiedToken = verifiedToken;
        // console.log(verifiedToken);
                                
        next();
    }).catch(onError);
}

