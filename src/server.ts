import app from './app';
import { config } from './config/config'; // Import config
import databaseInstance from './db/init.mongodb';


process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const server = app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGINT', async () => {
  await databaseInstance.closeConnection();
  console.log('SIGINT received. Gracefully shutting down the server...');
  server.close(() => {
    console.log('Server closed. Process terminated.');
    process.exit(0);
  });
});