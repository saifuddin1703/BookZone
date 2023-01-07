const {Book} = require('../../../models');

module.exports = {
    async getBooks(req, res,next){
        try {
            const books = await Book.find();
            res.status(200).json(
                {
                    status : 'success',
                    data : books
                }
            );
        } catch (error) {
            res.status(500).json({error: error.message});
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

    async createBook(req, res){
        res.send('books uploading is not implemented yet')
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