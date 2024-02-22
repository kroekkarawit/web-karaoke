import { BSON, Double, Int32, ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
    unique: true,
  },
  volume: {
    type: Number, // Changed type to Number
    required: true,
    maxLength: 100,
    default: 100,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Room = models.Room || model("Room", RoomSchema, "room");

export default Room;
