import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    currentRentedCar: {
        type : String,
        required: false,
        default: null
    }

}, {timestamps: true});

const User = mongoose.model('User', user);
export default User;
