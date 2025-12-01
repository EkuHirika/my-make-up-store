import axios from "axios";

export const login = async (email: string, password: string) => {
  const { data } = await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });
  console.log(data);
  return data;
}

export const register = async (first_name: string, last_name: string, phone: string, email: string, password: string) => {
  const { data } = await axios.post("http://localhost:3000/auth/register", {
    first_name, last_name, phone, email, password,
  });
  console.log(data);
  return data;
}