import mongoose from 'mongoose'

const connectDB = async(url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(()=> console.log('MongoDB Connected'))
    .catch((err)=>{
        console.error('failed to connect to mongo');
        console.log(err)
    });
}


export default connectDB;