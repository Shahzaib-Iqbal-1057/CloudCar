import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    frontPictureCNIC: {
        type: String,
        required: false,
        default: null
    },
    backPictureCNIC: {
        type: String,
        required: false,
        default: null
    },
    currentRentedCar: {
        type : String,
        required: false,
        default: null
    }
}, {timestamps: true});

const User = mongoose.model('User', user);
export default User;
