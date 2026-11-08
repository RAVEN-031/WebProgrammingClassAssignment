import { ApiError } from './error-handler.js';

// Validates and normalises POST /products body into { name, price }.
export function validateProduct(req, res, next) {
  const { name, price } = req.body ?? {};
  const errors = [];

  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('name wajib diisi dan berupa string');
  }

  const parsedPrice = typeof price === 'string' ? Number(price) : price;
  if (typeof parsedPrice !== 'number' || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
    errors.push('price wajib berupa angka >= 0');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join('; ')));
  }

  req.body = { name: name.trim(), price: parsedPrice };
  next();
}
