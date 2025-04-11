import mongoose from "mongoose";
import { config } from "../config/config"; // Import config
import { countConnect } from "../helpers/check.connect";

const connectString: string = `mongodb://${config.database.host}:${config.database.port}/${config.database.database}`;

class Database {
  private static instance: Database;
  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(connectString, {
        maxPoolSize: 50,
      });
      countConnect();
      console.log("Connected MongoDB Success");
    } catch (err) {
      console.error("Error Connect:", err);
      throw err;
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async closeConnection(): Promise<void> {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    } catch (err) {
      console.error("Error closing MongoDB connection:", err);
    }
  }
}

const databaseInstance = Database.getInstance();

export default databaseInstance;
