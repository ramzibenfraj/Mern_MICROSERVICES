// middleware/logger.js
const logger = (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
};

module.exports = logger; // Export the middleware function
