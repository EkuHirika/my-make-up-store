//contains the logic for handling requests and responses.
import { Request, Response } from 'express';
import * as productService from '../services/prooductService';
import { Product } from '../types/product';

export async function getProducts(req: Request, res: Response) {
  try {
    const products: Product[] = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const product: Product | null = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
