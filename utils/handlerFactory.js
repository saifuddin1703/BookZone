const ApiFeatures = require('./apiFeatures');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

module.exports = {
    createOne : Model => catchAsync(
        async (req, res, next) => {

            const doc = await Model.create(req.body);

            res.status(200).json(
                {
                    status : 'success',
                    data : doc
                }
            );
        }
    ),

    updateOne : (Model,ModelName) =>  catchAsync(
        async (req, res, next) => {

            const {id} = req.params;

            // console.log(req.body);
            // console.log(id);

            const doc = await Model.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

            // console.log(doc);
            if(!doc){
                return next(new AppError(`${ModelName} not found`,404));
            }

            res.status(200).json(
                {
                    status : 'success',
                    data : doc
                }
            );
        }
    ),

    deleteOne : (Model,ModelName) =>catchAsync(
        async (req, res, next) => {
            const {id} = req.params;

            const doc = await Model.findByIdAndDelete(id);

            if(!doc){
                return next(new AppError(`${ModelName} not found`,404));
            }

            res.status(204).json(
                {
                    status : 'success',
                    data : doc
                }
            );
        }
    ),

    getOne : (Model,ModelName,popOptions) => catchAsync(async(req, res,next) => {
            const {id} = req.params;

            const doc = await Model.findById(id).populate(popOptions);
            // console.log(doc);
            if (doc) {
                return res.status(200).json({
                    status : 'success',
                    data : doc
                });
            }else{
                next(new AppError(`${ModelName} not found`,404));
            }
        }
    ),

    getAll : Model => catchAsync(
        async (req, res, next) => {
                
                const apiFeatures = new ApiFeatures(Model.find(), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate();
    
                const docs = await apiFeatures.query;
    
                res.status(200).json(
                    {
                        status : 'success',
                        data : docs
                    }
                );
            }
    )
}