import express from 'express'
import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST ALL POSTS

router.post('/',async(req,res)=>{
    try {
        const {name, prompt, photo} = req.body;
        console.log({name, prompt, photo});

        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log(photoUrl);
    
        const newPost = new Post({
            name,
            prompt,
            photo: photoUrl.url,
        });

        await newPost.save();
    
        res.status(201).json({success: true, data: newPost});
    } catch (error) {
        res.status(500).json({success: false, message: error});
        console.log(error);
    }
});

// GET ALL POSTS

router.get('/',async(req,res)=>{
    try {
        const post = await Post.find({});
        res.status(200).json({success: true, data: post});
    } catch (error) {
        res.status(500).json({success: false, message: error}); 
    }
});



export default router;
