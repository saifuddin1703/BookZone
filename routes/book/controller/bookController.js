const {Book} = require('../../../models');
const AppError = require('../../../utils/AppError');
const fs = require('fs');
const csv = require('csv-parser');
const fileHandler = require('../../../utils/fileHandler');
const ApiFeatures = require('../../../utils/apiFeatures');
const catchAsync = require('../../../utils/catchAsync');

module.exports = {
    getBooks : catchAsync(async(req, res,next) =>{
         
            const features = new ApiFeatures(Book.find(), req.query);

            features
                .filter()
                .sort()
                .limitFields()
                .paginate();

            const books = await features.query;

            res.status(200).json(
                {
                    status : 'success',
                    data : books
                }
            );
    }),
    getBook : catchAsync(async(req, res,next) => {
            const {id} = req.params;
            const book = await Book.findById(id);
            console.log(book);
            if (book) {
                return res.status(200).json({
                    status : 'success',
                    data : book
                });
            }else{
                throw new AppError('Book not found',404);
            }
    }),

    createBooks : catchAsync(async (req, res,next)=>{
        // console.log(req.file)

        if(req.file.mimetype !== 'text/csv'){
            next(new AppError('File must be csv',400));
        }

        const books = await fileHandler.readCSV(req.file.path);
        console.log(books[0]);
        await Book.insertMany(books);

        res.status(200).json({
            status : 'success',
            data : "Books uploaded successfully"
        });
    }),
    
    updateBook : catchAsync(async (req, res,next)=>{

            const {id} = req.params;
            const book = await Book
                .findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
                
            if (book) {
                return res.status(200).json(
                    {
                        status : 'success',
                        data : book
                    }
                );
            }else{
                throw new AppError('Book not found',404);
            }

    }),

    deleteBook: catchAsync(async (req, res,next)=>{
        try {
            const {id} = req.params;
            const book = await Book.findByIdAndDelete(id);
            if (book) {
                return res.status(200).json(
                    {
                        status : 'success',
                        data : book
                    }
                );
            }else{
                throw new AppError('Book not found',404);
            }
        } catch (error) {
            next(error);
        }
    }),
}