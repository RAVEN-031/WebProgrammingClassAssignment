import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/products.controller.js';
import { validateId } from '../middleware/validate-id.js';
import { validateProduct } from '../middleware/validate-product.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', validateId, getProductById);
router.post('/', validateProduct, createProduct);

export default router;
