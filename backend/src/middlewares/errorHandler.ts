import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/types/custom-error";
import { ZodError } from "zod";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.message,
        });
    }
    const status = err.status;

    res.status(status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    })
}

export default errorHandler;