import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import apiKeyService from "../services/apiKey.service";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};
export const apiKey = async (req: any, res: Response, next: NextFunction) => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    const error = new Error("Forbidden");
    (error as any).statusCode = StatusCodes.FORBIDDEN;
    throw error;
  }
  const objKey = await apiKeyService.findById(key);
  if (!objKey) {
    const error = new Error("Forbidden");
    (error as any).statusCode = StatusCodes.FORBIDDEN;
    throw error;
  }
  req.objKey = objKey;
  next();
  return;
};
export const checkPermission = (permission: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    console.log('permission', req.objKey.permissions)
    if (!req.objKey.permissions) {
      const error = new Error("Permission denied");
      (error as any).statusCode = StatusCodes.FORBIDDEN;
      throw error;
    }
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      const error = new Error("Permission denied");
      (error as any).statusCode = StatusCodes.FORBIDDEN;
      throw error;
    }
    next();
  }
}
