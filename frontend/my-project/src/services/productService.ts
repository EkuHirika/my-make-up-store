import axios from 'axios';

export const getProducts = async () => {
  const { data } = await axios.get('http://localhost:3000/products');
  console.log(data);
  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await axios.get(`http://localhost:3000/products/details/${id}`);
  console.log(data);
  return data;
  
}
