import { Schema, model } from "mongoose";

interface IKeyToken extends Document {
    user: Schema.Types.ObjectId;
    publicKey: string;
    refreshToken: string[];
}

const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";


const keyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: Array,
    default: [],
    required: true,
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
})
const KeyTokenModel = model<IKeyToken>(DOCUMENT_NAME, keyTokenSchema)
export default KeyTokenModel