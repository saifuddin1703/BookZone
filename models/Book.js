const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    format : {
        type : String,
        required : true
    },
    book_depository_stars : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model('Book', bookSchema);
