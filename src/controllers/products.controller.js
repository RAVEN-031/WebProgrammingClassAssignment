import { ApiError } from '../middleware/error-handler.js';

let products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 },
];
let nextId = 3;

export function getProducts(req, res) {
  res.status(200).json(products);
}

export function getProductById(req, res, next) {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return next(new ApiError(404, 'Produk tidak ditemukan'));
  }

  res.status(200).json(product);
}

// req.body is already validated and normalised by validateProduct.
export function createProduct(req, res) {
  const product = { id: nextId++, ...req.body };

  products.push(product);
  res.status(201).json(product);
}
