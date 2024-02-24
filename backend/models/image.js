import mongoose from "mongoose";
const schema = mongoose.Schema;

const image = new schema({
    imageId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Image = mongoose.model('Image', image);
export default Image;