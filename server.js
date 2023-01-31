const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
const http = require('http');
const { connectDB } = require('./config');
const server = http.createServer(app);

connectDB();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
