module.exports.logRouteInfo = (req, res, next) => {
    if (req.url !== "/favicon.ico") {
        console.log(`${req.method}  ${req.url}\t`);
        next();
    }
};
