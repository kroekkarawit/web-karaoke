import { BSON, Double, Int32, ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
  name: {
    type: String,
  },
  room:{
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema, 'user');

export default User;
