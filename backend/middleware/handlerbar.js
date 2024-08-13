<<<<<<< HEAD
import logger from './logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
=======
import logger from './logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
