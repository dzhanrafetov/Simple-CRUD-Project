import { Request, Response, NextFunction } from "express";

// Error-handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack to the console (or use a logger)

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong',
  });
};

export default errorHandler;
