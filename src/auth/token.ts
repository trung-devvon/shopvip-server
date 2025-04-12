import jwt from "jsonwebtoken";
import { Types } from "mongoose";


const createTokenPair = (userId: Types.ObjectId, email: string, publicKey: any, privateKey: any) => {
  try {
    const accessToken = jwt.sign({ userId, email }, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign({ userId, email }, privateKey, {
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (err: any, decode: any) => {
      if (err) {
        console.error('Error verifying access token:', err);
      } else {
        console.log('Access token decoded:', decode);
      }
    })

    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    console.error('Error creating token pair:', error);
    throw new Error('Failed to create token pair');
  }
};

export { createTokenPair };
