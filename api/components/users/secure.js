const auth = require('../../../auth');

module.exports = (action) => {

    const middleware = async (req, res, next) => {
        try{
            switch(action){
                case 'update':
                    auth.check.own(req)
                    next();
                    break;

                case 'follow':
                    auth.check.logget(req)
                    next();
                    break;
                default:
                    next();
            }
        } catch (error) {
            next(error);
        }

    }

    return middleware;
}