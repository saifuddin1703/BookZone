const {Book} = require('../../../models');
const AppError = require('../../../utils/AppError');
const fs = require('fs');
const csv = require('csv-parser');
const fileHandler = require('../../../utils/fileHandler');
const ApiFeatures = require('../../../utils/apiFeatures');
const catchAsync = require('../../../utils/catchAsync');
const factory = require('../../../utils/handlerFactory');

module.exports = {
    getBooks : factory.getAll(Book),

    getBook : factory.getOne(Book,"Book"),

    // deleteAllBooks : async ()=>{
    //     try {
    //         await Book.deleteMany();
    //     } catch (error) {
    //         console.log(error);
    //         throw new AppError('Error deleting books',500);
    //     }
    // },

    createBooks : catchAsync(async (req, res,next)=>{
        // console.log(req.file)

        if(req.file.mimetype !== 'text/csv'){
            next(new AppError('File must be csv',400));
        }

        const books = await fileHandler.readCSV(req.file.path);
        console.log(books[0]);
        await Book.deleteMany();
        await Book.insertMany(books);

        res.status(200).json({
            status : 'success',
            data : "Books uploaded successfully"
        });
    }),

    createBook : factory.createOne(Book),
    
    updateBook : factory.updateOne(Book,"Book"),

    deleteBook: factory.deleteOne(Book,"Book"),
}