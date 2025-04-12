import { Types } from "mongoose";
import KeyTokenModel from "../models/keyToken.model";
import HandleError from "@middlewares/error";

class KeyTokenService {
  async createKeyToken({
    userId,
    publicKey,
    privateKey,
  }: {
    userId: Types.ObjectId;
    publicKey: any;
    privateKey: any;
  }) {
    const keyToken = await KeyTokenModel.create({
      user: userId,
      publicKey,
      privateKey,
    });

    if (!keyToken) {
      throw HandleError.internal("Failed to create key token");
    }

    return keyToken ? keyToken.publicKey : null;
  }
}
export default new KeyTokenService();
