import { Prisma } from '@prisma/client';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function notFound(req, res) {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
}

// Express recognises an error handler by its four-parameter signature.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Malformed JSON body is thrown by express.json() with status 400.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Body request bukan JSON yang valid' });
  }

  // P2025: the row targeted by update/delete does not exist.
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  const status = err.status || 500;

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    message: status >= 500 ? 'Internal Server Error' : err.message,
  });
}
