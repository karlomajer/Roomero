const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Successfully connected to MongoDB database!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
