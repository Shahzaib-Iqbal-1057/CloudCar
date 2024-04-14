import mongoose from "mongoose";
const schema = mongoose.Schema;

const likesSchema = new schema({
  username: { type: String, required: true },
  likedPosts: { type: [Number], default: [] }
});

const Likes = mongoose.model('Likes', likesSchema);
export default Likes;
