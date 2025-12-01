//defines application routes and links them to controllers.
import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/', productController.getProducts);      // GET /products
router.get('/details/:id', productController.getProduct);    // GET /products/:id

export default router;
