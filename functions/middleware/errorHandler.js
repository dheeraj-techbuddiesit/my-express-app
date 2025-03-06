const errorHandler = (err, req, res, next) => {
  const statusCode = res?.statusCode? res?.statusCode : 500;
  switch (statusCode) {
    case VALIDATION_ERROR:
        res.json({
            status: statusCode,
            title:'Bad Request',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    case NOT_FOUND:
        res.json({
            status: statusCode,
            title:'Not Found',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    case UNAUTHORIZED:
        res.json({
            status: statusCode,
            title:'Unauthorized',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    case FORBIDDEN:
        res.json({
            status: statusCode,
            title:'Forbidden',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    case INTERNAL_SERVER_ERROR:
        res.json({
            status: statusCode,
            title:'Internal Server Error',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
  }
}
module.exports = errorHandler;