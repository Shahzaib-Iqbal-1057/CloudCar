import mongoose from "mongoose";
const Schema = mongoose.Schema;

const car = new Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    ownerDisplayName: {
        type: String,
        required: false
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    

}, {timestamps: true});

const Car = mongoose.model('Car', car);
export default Car;

