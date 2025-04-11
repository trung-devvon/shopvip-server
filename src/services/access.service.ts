import { StatusCodes } from "http-status-codes";
import ShopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import keyTokenService from "./keyToken.service";
import { createTokenPair } from "../auth/token";
import { getInfoData } from "../utils/fn";

class AccessService {
  async signup({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const shop = await ShopModel.findOne({ email }).lean();
      if (shop) {
        const error = new Error("Shop with this email already exists");
        (error as any).statusCode = StatusCodes.CONFLICT;
        throw error;
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newShop = await ShopModel.create({
        email,
        password: hashPassword,
        name,
        roles: ["SHOP"],
      });
      // check new shop is true
      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        });

        const publicKeyString = await keyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey,
        });
        if (!publicKeyString) {
          throw new Error("public key error");
        }
        // only get public key from db
        const token = createTokenPair(
          newShop._id,
          email,
          publicKeyString,
          privateKey
        );

        return {
          data: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            token,
          },
        };
      }
      //
      throw new Error("Signup failed");
    } catch (error) {
      throw error;
    }
  }
}
export default new AccessService();
