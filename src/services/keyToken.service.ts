import { Types } from "mongoose";
import KeyTokenModel from "../models/keyToken.model";
import { StatusCodes } from "http-status-codes";

class KeyTokenService {
    async createKeyToken({ userId, publicKey }: { userId: Types.ObjectId, publicKey: any }) {
        try {
            const keyToken = await KeyTokenModel.create({
                user: userId,
                publicKey,
            });

            if (!keyToken) {
                const error = new Error("Failed to create key token");
                (error as any).statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                throw error;
            }

            return keyToken ? keyToken.publicKey : null;
        } catch (error) {
            throw error;
        }
    }
}
export default new KeyTokenService();