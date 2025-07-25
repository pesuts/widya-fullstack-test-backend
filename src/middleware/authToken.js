"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = authToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authToken(req, res, next) {
    const secretKey = process.env.JWT_SECRET || "SECRET_KEY";
    const header = req.headers;
    const token = header.authorization?.split(" ")[1];
    if (token == null) {
        return res.status(403).send({ status: "error", message: "User not authenticated!" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error(err?.message);
        return res.status(403).send({ status: "error", message: err.message });
    }
}
