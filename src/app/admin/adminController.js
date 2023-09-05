import { isAdmin } from "./adminProvider";
import { baseResponse, response, errResponse } from "../../../config/response";
import { getAllUsersInfo } from "./adminProvider"
import { signUpByAdmin } from "./adminService"

export const getUsersInfo = async(req, res) => {
    const userEmail = req.verifiedToken.userEmail;

    if (!isAdmin(userEmail)) return res.send(errResponse(baseResponse.NOT_ADMIN));

    const getAllUsersInfoResult = await getAllUsersInfo();

    return res.send(response(baseResponse.SUCCESS, getAllUsersInfoResult));
}

export const adminSignUp = async(req, res) => {
    const userEmail = req.verifiedToken.userEmail;

    if (!isAdmin(userEmail)) return res.send(errResponse(baseResponse.NOT_ADMIN));

    const userInfo =  req.body;

    const getAdminSignUpResult = await signUpByAdmin(userInfo);

    return res.send(response(baseResponse.SUCCESS));
}

export const userReports = async(req, res) => {
    const userEmail = req.verifiedToken.userEmail;

    if (!isAdmin(userEmail)) return res.send(errResponse(baseResponse.NOT_ADMIN));

    const userInfo =  req.body;

    const getAdminSignUpResult = await signUpByAdmin(userInfo);

    return res.send(response(baseResponse.SUCCESS));
}

export const postReports = async(req, res) => {
    const userEmail = req.verifiedToken.userEmail;

    if (!isAdmin(userEmail)) return res.send(errResponse(baseResponse.NOT_ADMIN));

    const userInfo =  req.body;

    const getAdminSignUpResult = await signUpByAdmin(userInfo);

    return res.send(response(baseResponse.SUCCESS));
}