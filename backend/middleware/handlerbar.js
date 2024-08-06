import logger from './logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
