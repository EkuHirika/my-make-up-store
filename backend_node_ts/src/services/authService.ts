import pool from '../config/db';
import { User } from '../types/user';
import bcrypt from 'bcrypt';

export async function login(email: string, password: string): Promise<User | null> {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  const user = result.rows[0];
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return user || null;
}

 export async function register( first_name: string, last_name: string, phone: string, email: string,  password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);

    const result =  await pool.query(
     'INSERT INTO users (first_name, last_name, phone, email,  password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
     [first_name, last_name, phone, email, hashed]
   );
   return result.rows[0];
 }
