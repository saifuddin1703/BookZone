const {Book} = require('../../../models');
const AppError = require('../../../utils/AppError');
const fs = require('fs');
const csv = require('csv-parser');
const fileHandler = require('../../../utils/fileHandler');
const ApiFeatures = require('../../../utils/ApiFeatures');

module.exports = {
    async getBooks(req, res,next){
        try {
            
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
        } catch (error) {
            next(error);
        }
    },
    async getBook(req, res,next){
        try {
            const {id} = req.params;
            const book = await Book.findById(id)
            if (book) {
                return res.status(200).json({
                    status : 'success',
                    data : book
                });
            }else{
                throw new AppError('Book not found',404);
            }
        } catch (error) {
            next(error);
        }
    },

    async createBooks(req, res,next){
        // console.log(req.file)

        if(req.file.mimetype !== 'text/csv'){
            next(new AppError('File must be csv',400));
        }

        try{
            const books = await fileHandler.readCSV(req.file.path);
            console.log(books[0]);
            await Book.insertMany(books);

            res.status(200).json({
                status : 'success',
                data : "Books uploaded successfully"
            });

        }catch(error){
            next(error);
        }
    },
    
    async updateBook(req, res,next){
        try {
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
        } catch (error) {
            next(error);
        }
    },

    async deleteBook(req, res,next) {
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
    },

    async getBooksByCategory(req, res,next){
        try {
            const {category} = req.params;
            const books = await Book.find({category: category});
            if (books) {
                return res.status(200).json({
                    status : 'success',
                    data : books
                });
            }else{
                throw new AppError('Book not found',404);
            }
        } catch (error) {
            next(error);
        }
    }

}