import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import defaultImg from "../assets/img/product-default-image.png";
import Navbar from "../components/Navbar";
import { MdFavoriteBorder } from "react-icons/md";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <div className="bg-[#FFF5E1]">
        <Navbar />
        <h1 className="text-3xl">Products</h1>

        <div className="products-sections flex flex-wrap justify-center gap-3 w-[70%] mx-auto">
          {products.map((p) => (
            <section
              key={p.id}
              className="product-card border-3 border-[#00D4FF] bg-white p-4 rounded-md h-110 w-70"
            >
              <button className="absolute text-3xl translate-x-51 translate-y-2"><MdFavoriteBorder /></button>
              <img src={defaultImg} alt="Img of the product" />
              <div className="h-[30%]">
              <h2>{p.brand_name}</h2>
              <h3 className="font-bold text-xl">{p.name}</h3>
              <p>Price: {p.price}€</p>
              </div>
              <div className="flex justify-end gap-2 p-1">
                <button className="border border-2 bg-white rounded-md text-xl h-8 p-1 flex items-center"><Link to={`/products/details/${p.id}`} >Discover</Link></button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
