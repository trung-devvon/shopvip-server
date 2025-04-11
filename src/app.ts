import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { StatusCodes } from "http-status-codes";
import { config } from "./config/config";
import { registerRoutes } from "./routes";


const app: Application = express();
const environment = config.env;

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Nén dữ liệu HTTP
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware - only development
if (environment === "development") {
  app.use(morgan("dev"));
}
// Routes
registerRoutes(app);

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Server is running",
    environment: environment,
  });
});
app.get("/", (req: Request, res: Response) => {
  const str = "Hello World!";
  res.status(StatusCodes.OK).json({
    message: "test request"
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global handler
app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
  console.error(err);

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export default app;
