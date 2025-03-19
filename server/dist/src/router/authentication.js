"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../controllers/Authentication");
const refreshAccessToken_1 = require("../utils/refreshAccessToken");
exports.default = (router) => {
    router.post('/auth/register', Authentication_1.register); // register students and teachers
    router.post('/auth/login', Authentication_1.login); // login students and teachers
    router.post('/auth/refresh', refreshAccessToken_1.refresh); // refresh access token if expired on the server
    router.post('/auth/logout', Authentication_1.logout); // logs out students and teachers
};
//# sourceMappingURL=authentication.js.map