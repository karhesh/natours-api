const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled exception');
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection');
  server.close(() => {
    process.exit(1);
  });
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected successfully');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('App running');
});
