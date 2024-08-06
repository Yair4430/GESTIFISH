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
>>>>>>> 65db394cd671beb8a46b6119eed97cee22344cde
