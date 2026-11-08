// Express 4 does not catch rejections from async handlers: an unhandled
// promise leaves the request hanging instead of reaching errorHandler.
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
