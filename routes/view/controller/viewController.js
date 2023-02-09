const ApiFeatures = require('../../../utils/apiFeatures');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');
const { Book } = require('../../../models');

module.exports = {

    async getHomePage(req,res,next){
        req.query.category = 'Biography'
        const apiFeatures = new ApiFeatures(Book.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const books = await apiFeatures.query;
        res.render('home',{
            books : books,
            name : "hellow"
        });
    },

    getLoginPage(req,res,next){
        res.render('login');
    },
    
    getSignupPage(req,res,next){
        res.render('signup');
    },

}