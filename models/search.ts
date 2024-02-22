import { BSON, Double, Int32, ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const SearchSchema = new Schema({
  query: {
    type: String,
  },
  raw_query: {
    type: String,
  },
  data: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Search = models.Search || model("Search", SearchSchema, "search");

export default Search;
