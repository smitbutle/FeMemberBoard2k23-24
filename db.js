const mongoose = require('mongoose');
require('dotenv').config()
const monngodb_url =process.env.MONGO_URI ;
const connectMongoDB = async ()=>{
    await mongoose.connect(monngodb_url).then(()=>{
        console.log("mongodb is connected");
    }).catch((error)=>{
        console.log("mongodb not connected");
        console.log(error);
    });     
}

module.exports = connectMongoDB

// const mongoose = require('mongoose');
// // require('dotenv').config();
// const monngodb_url = process.env.MONGO_URI;

// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(monngodb_url);
//         console.log('Mongodb is connected');

//         // Define your schema
//         const memberBoardSchema = new mongoose.Schema({
//             // Define your schema fields here
//             // For example:
//             name: String,
//             age: Number,
//             // Add other fields as needed
//         });

//         // Create a model
//         const MemberBoard = mongoose.model('MemberBoard', memberBoardSchema);

//         // Create an instance of the model
//         const member = new MemberBoard({
//             name: 'John Doe',
//             age: 30,
//         });

//         // Save the instance to the database
//         await member.save();
//         console.log('Member added to the MemberBoard collection');
//     } catch (error) {
//         console.log('Mongodb not connected');
//         console.error(error);
//     }
// };

// module.exports = connectMongoDB;
