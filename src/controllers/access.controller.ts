import { NextFunction, Request, Response } from "express";
import accessService from "../services/access.service";
import { StatusCodes } from "http-status-codes";
import KeyTokenModel from "../models/keyToken.model";

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const result = await accessService.signup({ email, name, password });
     res.status(StatusCodes.CREATED).json(result);
     return;
  } catch (error) {
    next(error);
  }
};

export const test = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await KeyTokenModel.findById(id);
    res.status(StatusCodes.OK).json(result);
    return;
  } catch (error) {
    next(error);
  }
};

