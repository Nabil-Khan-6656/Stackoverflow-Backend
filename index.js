const express = require('express');
const app = express();
const dotenv = require('dotenv')
const {cloudinary} = require('./Utils/cloudinary');
const port = process.env.PORT || 5000 ;

const userRoutes = require('./routes/users.js') 
const questionRoutes = require('./routes/Questions.js')
const answerRoutes = require('./routes/Answers.js')
var cors = require('cors');
const mongoose = require('mongoose')
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get('/api/images', async(req,res)=>{
    const { resources} = await cloudinary.search.expression('folder:dev_setup ')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
    const publicId  = resources.map( file => file.public_id);
    res.send(publicId) 
})

app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API")
})



app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)


app.post('/api/uploads', async (req,res)=>{
    try {
        const fileStr = req.body.data ;
        const uplodeResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset: 'dev_setup'
        })


        // console.log(uplodeResponse.format);
        res.json({msg: "Uploded"})
    } catch (err) {
        console.log(err);
        res.status(500).json({err: "Something went wrong"})
    }
})

const DATABASE_URL = process.env.DB



mongoose.connect(DATABASE_URL).then(()=>{
    console.log(`Connection Successful`);
}).catch((err)=> console.log(err))


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})