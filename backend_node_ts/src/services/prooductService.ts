//contains business logic and interacts with data sources or external APIs.
import pool from '../config/db';
import { Product } from '../types/product';

export async function getAllProducts(): Promise<Product[]> {
  const result = await pool.query(' SELECT products.*, brands.name AS brand_name FROM products JOIN brands ON products.brand_id = brands.id');
  return result.rows as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const result = await pool.query('SELECT products.*, brands.name AS brand_name, categories.name AS category_name FROM products JOIN brands ON products.brand_id = brands.id  JOIN categories ON products.category_id = categories.id WHERE products.id = $1', [id]
  );
  return result.rows[0] || null;
}

