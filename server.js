const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;
const http = require('http');
const { connectDB } = require('./config');
const server = http.createServer(app);

connectDB();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// handling error in case of unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});