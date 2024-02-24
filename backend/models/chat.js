import mongoose from "mongoose";
const schema = mongoose.Schema;

const chat = new schema({
    chatId: {
        type: String,
        required: true,
    },
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    messages: {
        type: [{
            sender: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true 
            },
            timestamp: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }],
        required: false
    }
})

const Chat = mongoose.model('Chat', chat);
export default Chat