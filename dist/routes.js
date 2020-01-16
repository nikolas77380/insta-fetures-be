"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const auth_1 = __importDefault(require("./../src/controllers/auth"));
function defineRoutes(app) {
    const router = express.Router();
    const authCtrl = new auth_1.default();
    // Auth
    router.route('/login').post(authCtrl.loginUser);
}
exports.default = defineRoutes;
//# sourceMappingURL=routes.js.map