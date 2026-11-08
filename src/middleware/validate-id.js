import { ApiError } from './error-handler.js';

// Rejects a non-positive-integer :id before it reaches the controller.
export function validateId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return next(new ApiError(400, 'ID harus berupa bilangan bulat positif'));
  }

  next();
}
