import mongoose from "mongoose";
const schema = mongoose.Schema;

const notificationSchema = new schema({
  type: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Notifications = mongoose.model('Notifications', notificationSchema);

export default Notifications;
