"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cron = require('node-cron');
const cors = require('cors');
const axios = require('axios');
// import { urlSegmentToInstagramId } from 'instagram-id-to-url-segment';
const users = require('../routes/api/users');
const posts = require('../routes/api/posts');
const auth = require('../routes/api/auth');
const bodyParser = require('body-parser');
//--------------------//
const Post = require('../models/Post');
//--------------------//
dotenv_1.default.config();
const app = express_1.default();
const connectDb = require('../config/db');
connectDb();
//Init Middleware+
app.use(cors());
app.use(bodyParser.json({ extended: false }));
// Define router
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
const testPosting = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post.findById('5dfb3852acc2531f46653af7');
        // instagram business account - 17841401416156686
        // steps to reproduce : /me/accounts -> page_id -> /page_id/instagram_business_account
        //image - https://backend_url/images/post.id.jpg
        const image = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/D36A/production/_110422145_firemapanthony.jpg';
        const media_id = yield axios.post('https://graph.facebook.com/17841401416156686/media', {
            image_url: image,
            caption: post.caption
        });
        console.log(media_id);
    }
    catch (error) {
        console.error(error);
    }
});
testPosting();
cron.schedule("* * * * *", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield Post.findById('5dfb3852acc2531f46653af7');
        // instagram business account - 17841401416156686
        // steps to reproduce : /me/accounts -> page_id -> /page_id/instagram_business_account
        //image - https://backend_url/images/post.id.jpg
        const image = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/D36A/production/_110422145_firemapanthony.jpg';
        const media_id = yield axios.post('https://graph.facebook.com/17841401416156686/media', {
            image_url: image,
            caption: post.caption
        });
        console.log(media_id);
        //POST graph.facebook.com/17841401416156686/media?image_url=https//www.example.com/images/bronz-fonz.jpg&caption=#BronzFonz
        console.log(post);
        console.log("running a task every minute");
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Example app listening on port ' + PORT));
//# sourceMappingURL=server.js.map