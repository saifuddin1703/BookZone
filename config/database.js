const mongoose = require('mongoose');

module.exports = connectDb = async () => {
    try {
      mongoose.set('strictQuery', true);

      let url = process.env.MONGODB_URL_TEST;

      if (process.env.NODE_ENV === 'production') {
        url = process.env.MONGODB_URL_PROD;
      }

      await mongoose.connect(url , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }); 
        console.log('MongoDB Connected...')
    } catch (error) {
      console.log("db error : " + error.message)
    }
}