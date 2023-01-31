const mongoose = require('mongoose');

module.exports = connectDb = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(process.env.MONGODB_URL_TEST , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }); 
        console.log('MongoDB Connected...')
    } catch (error) {
      console.log("db error : " + error.message)
    }
}