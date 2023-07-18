//API 응답의 기본 형식들 정의

const baseResponse = {
    SUCCESS : { "isSuccess": true, "code": 200, "message":"성공" },

    USER_USERID_EMPTY: {
        isSuccess: false,
        code: 2012,
        message: 'userId를 입력해주세요.',
    },
    USER_USERID_NOT_EXIST: {
        isSuccess: false,
        code: 2013,
        message: '해당 회원이 존재하지 않습니다.',
    },
 
};

export default baseResponse;