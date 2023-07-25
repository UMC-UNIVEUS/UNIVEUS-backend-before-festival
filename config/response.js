//API 응답의 기본 형식들 정의

export const baseResponse = {
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //유저 관련 오류
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2002, "message": "해당 유저가 존재하지 않습니다." },
    SIGNUP_EMAIL_DUPLICATE : {"isSuccess" : false, "code" : 2003, "message" : "이미 존재하는 이메일입니다."},
    SIGNUP_EMAIL_KYONGGI : {"isSuccess" : false, "code" : 2004, "message" : "경기대학교 이메일만 사용 가능합니다."},
    SIGNUP_NICKNAME_EMPTY : {"isSuccess" : false, "code" : 2005, "message" : "닉네임을 입력해주세요."},
    SIGNUP_GENDER_EMPTY : {"isSuccess" : false, "code" : 2006, "message" : "성별을 입력해주세요."},
    SIGNUP_MAJOR_EMPTY : {"isSuccess" : false, "code" : 2007, "message" : "학과를 입력해주세요."},
    SIGNUP_STUDENTID_EMPTY : {"isSuccess" : false, "code" : 2008, "message" : "학번을 입력해주세요."},
    LOGIN_NOT_USER : {"isSuccess" : false, "code" : 2009, "message" : "회원이 아닙니다." },

    
    POST_POSTID_NOT_EXIST : { "isSuccess": false, "code": 3002, "message": "해당 게시글이 존재하지 않습니다." },

    
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},

    // 토큰 오류
    TOKEN_EMPTY : { "isSuccess": false, "code": 5000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 50001, "message":"JWT 토큰 검증 실패" },

};



/*API의 응답을 해준다*/ 
export const response = ({isSuccess, code, message}, result) => {
    return {
         isSuccess: isSuccess,
         code: code,
         message: message,
         result: result
    }
};
 
export const errResponse = ({isSuccess, code, message}) => {
     return {
         isSuccess: isSuccess,
         code: code,
         message: message
       }
};