import mongoose from "mongoose";
const Schema = mongoose.Schema;

const car = new Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: Number,
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
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    

}, {timestamps: true});

const Car = mongoose.model('Car', car);
export default Car;

