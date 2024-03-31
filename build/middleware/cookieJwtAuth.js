"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieJwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        res.clearCookie("token");
        return res.status(403).send();
    }
};
exports.cookieJwtAuth = cookieJwtAuth;
