const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    image : {
        type : String,
        required : false
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
        required : true,
        default : 'Paperback'
    },
    book_depository_stars : {
        type : Number,
        required : true,
        default : 4.5
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);
