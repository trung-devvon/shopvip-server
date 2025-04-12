import ApiKeyModel from "../models/apiKey.model";
import crypto from "crypto";

class ApiKeyService {
    async findById(key: string) {
        try {
            const newKey = await ApiKeyModel.create({
                key: crypto.randomBytes(64).toString("hex"),
                permissions: ["0000"],
            });
            console.log(newKey)
            const objKey = await ApiKeyModel.findOne({ key, status: true }).lean();
            return objKey;
        } catch (error) {
            throw error;
        }
    }
}
export default new ApiKeyService();