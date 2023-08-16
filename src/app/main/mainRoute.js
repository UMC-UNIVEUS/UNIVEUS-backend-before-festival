import express from "express"
import { getPostListPage, searchTitle } from "./mainController"
import { jwtMiddleware } from "../../../config/jwtMiddleWare";

const mainRouter = express.Router();

mainRouter.get('/', jwtMiddleware, getPostListPage);
mainRouter.get('/search', searchTitle);

export default mainRouter;