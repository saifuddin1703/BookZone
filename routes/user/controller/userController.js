const { get } = require('mongoose');
const {User} = require('../../../models/');
const AppError = require('../../../utils/AppError');
const factory = require('../../../utils/handlerFactory');


module.exports = {
    
    getAllUser : factory.getAll(User),
    getUserById : factory.getOne(User),
    createUser : factory.createOne(User),
    updateUser : factory.updateOne(User),
    deleteUser : factory.deleteOne(User)
    
}
