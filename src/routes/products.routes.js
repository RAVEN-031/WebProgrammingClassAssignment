import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import { validateId } from '../middleware/validate-id.js';
import { validateProduct } from '../middleware/validate-product.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', validateId, getProductById);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateId, validateProduct, updateProduct);
router.delete('/:id', validateId, deleteProduct);

export default router;
