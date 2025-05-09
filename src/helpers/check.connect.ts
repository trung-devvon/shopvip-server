import mongoose from "mongoose";

const _SECONDS = 5000;

const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};
// check over load
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = require('os').cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;
    console.log(`Active connections: ${numConnections}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnections > maxConnections) {
      console.log("Connection overload detected!");
      // Notify admin or perform other actions
    }
  }, _SECONDS)
}
export { countConnect, checkOverload };
