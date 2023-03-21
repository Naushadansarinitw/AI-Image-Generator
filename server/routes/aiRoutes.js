import express from 'express'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    organization: "org-rpkX3UULHHM0WX7gUUHWTXV1",
    apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);


router.get('/',async (req,res)=> {
    res.send('Hello from Dalle api');
});

router.post('/',async(req,res)=>{
    try {
        const {prompt} = req.body;
        console.log(prompt);

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'url',
        });
        // console.log("Hello");
        const image = aiResponse.data.data[0].url;

        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})


export default router;