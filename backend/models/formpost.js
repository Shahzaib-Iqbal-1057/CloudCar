import mongoose from "mongoose";
const schema = mongoose.Schema;

const post = new schema({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    // images: {
    //     type: [String],
    //     required: false
    // }    
    replies: {
        type: [{
            username: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            // images: {
            //     type: [String],
            //     required: false
            // }
        }],
        required: false
    }
})

const Post = mongoose.model('Post', post);
export default Post;


