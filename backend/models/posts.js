import mongoose from "mongoose";
const schema = mongoose.Schema;

const posts = new schema({
    postId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        default: ""
    },
    messageContent: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [Number] 
});

const Posts = mongoose.model('Posts', posts);
export default Posts;
