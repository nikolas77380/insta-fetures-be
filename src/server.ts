import express from 'express';

import dotenv from 'dotenv';
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


dotenv.config();
const app = express();

const connectDb = require('../config/db');
connectDb();

//Init Middleware+
app.use(cors());
app.use(bodyParser.json({extended: false}));

// Define router

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

const testPosting = async () => {
  try{
  const post = await Post.findById('5dfb3852acc2531f46653af7');
    // instagram business account - 17841401416156686
    // steps to reproduce : /me/accounts -> page_id -> /page_id/instagram_business_account
    //image - https://backend_url/images/post.id.jpg
    const image = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/D36A/production/_110422145_firemapanthony.jpg';
    
    const media_id = await axios.post('https://graph.facebook.com/17841401416156686/media', {
      image_url: image,
      caption: post.caption
    })
    console.log(media_id);
  } catch(error) {
    console.error(error);
  }
}
testPosting();

cron.schedule("* * * * *", async function() {
    const post = await Post.findById('5dfb3852acc2531f46653af7');
    // instagram business account - 17841401416156686
    // steps to reproduce : /me/accounts -> page_id -> /page_id/instagram_business_account
    //image - https://backend_url/images/post.id.jpg
    const image = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/D36A/production/_110422145_firemapanthony.jpg';
    
    const media_id = await axios.post('https://graph.facebook.com/17841401416156686/media', {
      image_url: image,
      caption: post.caption
    })
    console.log(media_id);
    //POST graph.facebook.com/17841401416156686/media?image_url=https//www.example.com/images/bronz-fonz.jpg&caption=#BronzFonz

    console.log(post)
    console.log("running a task every minute");
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Example app listening on port '+ PORT));
