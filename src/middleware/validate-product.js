import { ApiError } from './error-handler.js';

// Validates and normalises a product body into { name, price }.
// Used by POST (create) and PUT (update); PUT additionally requires the
// body id to match the path id, checked here so the rule lives in one place.
export function validateProduct(req, res, next) {
  const { id, name, price } = req.body ?? {};
  const errors = [];

  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('name wajib diisi dan berupa string');
  }

  const parsedPrice = typeof price === 'string' ? Number(price) : price;
  if (typeof parsedPrice !== 'number' || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
    errors.push('price wajib berupa angka >= 0');
  }

  if (req.method === 'PUT') {
    if (id === undefined) {
      errors.push('id wajib disertakan pada body PUT');
    } else if (Number(id) !== Number(req.params.id)) {
      errors.push('id pada body harus sama dengan id pada path');
    }
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join('; ')));
  }

  req.body = { name: name.trim(), price: parsedPrice };
  next();
}
