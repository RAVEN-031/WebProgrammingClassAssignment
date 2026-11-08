import { prisma } from '../../lib/prisma.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../middleware/error-handler.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  res.status(200).json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!product) {
    throw new ApiError(404, 'Produk tidak ditemukan');
  }

  res.status(200).json(product);
});

// req.body is already validated and normalised by validateProduct.
export const createProduct = asyncHandler(async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product);
});
