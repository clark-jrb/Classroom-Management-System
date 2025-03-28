"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.randomNum = void 0;
const crypto_1 = __importDefault(require("crypto"));
const randomNum = () => crypto_1.default.randomBytes(128).toString('base64');
exports.randomNum = randomNum;
const authentication = (salt, password) => {
    return crypto_1.default.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET_TOKEN).digest('hex');
};
exports.authentication = authentication;
//# sourceMappingURL=index.js.map