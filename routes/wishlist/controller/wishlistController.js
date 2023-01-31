const { get } = require('mongoose');
const Wishlist = require('../../../models/Wishlist');
const AppError = require('../../../utils/AppError');

module.exports = {
    async getWishlist(req, res,next) {
        const userid = req.user.id; 
        try {
            const wishlist = await Wishlist.findOne({user : userid}).populate('books');

            if(!wishlist) {
                throw new AppError('Wishlist not found',404);
            }

            return res.status(200).json({
                status : 'success',
                data : wishlist
            });
        }
        catch (error) {
            return next(error);
        }   
    },

    async addToWishList(req, res,next) {
        const userid = req.user.id;
        try{
            let wishlist = await Wishlist.findOne({user : userid});
            if(!wishlist) {
                wishlist = new Wishlist({
                    user : userid,
                    books : [req.body.book]
                })

                await wishlist.save(); 

                return res.status(200).json({
                    status : 'success',
                    data : wishlist
                });
            }
            const book = req.body.book;
            if(!book) {
                throw new AppError('Book not found',404);
            }
            wishlist.books.push(book);
            await wishlist.save();
            return res.status(200).json({
                status : 'success',
                data : wishlist
            });

        }catch(error){
            next(error);
        }
    },

    async removeFromWishList(req, res,next) {
        const userid = req.user.id;
        try{
            const wishlist = await Wishlist.findOne({user : userid});
            if(!wishlist) {
                throw new AppError('Wishlist not found',404);
            }
            const book = req.body.book;
            if(!book) {
                throw new AppError('Provide a valid book id',404);
            }
            wishlist.books.pull(book);
            await wishlist.save();
            return res.status(200).json({
                status : 'success',
                data : wishlist
            });

        }catch(error){
            next(error);
        }
    }
        
}; 