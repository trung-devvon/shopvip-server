import { Schema, model, Document } from "mongoose";

interface IApiKey extends Document {
    key: string; // Changed from String to string
    status: boolean;
    permissions: string[]
}

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const ApiKeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  permissions: {
    type: [String],
    required: true,
    enum: ["0000", "1111", "2222"],
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
})

const ApiKeyModel = model<IApiKey>(DOCUMENT_NAME, ApiKeySchema)
export default ApiKeyModel