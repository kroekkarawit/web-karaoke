import { BSON, Double, Int32, ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const PlaylistSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  youtube_id: {
    type: String,
  },
  title: {
    type: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "ACTIVE", "INACTIVE"],
    default: "PENDING",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Playlist =
  models.Playlist || model("Playlist", PlaylistSchema, "playlist");

export default Playlist;
