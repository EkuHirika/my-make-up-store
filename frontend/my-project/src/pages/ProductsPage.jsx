import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import defaultImg from "../assets/img/product-default-image.png";
import Navbar from "../components/Navbar";
import { MdFavoriteBorder } from "react-icons/md";
import backgroundImg from "../assets/img/minimal-surrealistic-abstract-background.jpg";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <div className=" min-h-screen" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}>
        <Navbar />

        <div className="products-sections flex flex-wrap justify-center gap-6 w-[60%] mx-auto pt-10">
          {products.map((p) => (
            <section
              key={p.id}
              className="product-card relative border border-[#00D4FF] bg-white p-4 rounded-lg w-64 h-[370px] shadow-md"
            >
              {/* Favorite button */}
              <button className="absolute top-2 right-2 text-3xl text-gray-600 hover:text-pink-500 transition">
                <MdFavoriteBorder />
              </button>

              {/* Image */}
              <div className="w-full h-40 flex justify-center items-center overflow-hidden">
                <img
                  src={defaultImg}
                  alt="Product"
                  className="h-full object-contain"
                />
              </div>

              {/* Text section */}
              <div className="mt-3 flex flex-col h-32">
                <h2 className="text-sm text-gray-600">{p.brand_name}</h2>
                <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
                <p className="mt-1 text-md font-semibold">Price: {p.price}€</p>
              </div>

              {/* Bottom button */}
              <div className="flex justify-end">
                <Link
                  to={`/products/details/${p.id}`}
                  className="border border-[#00D4FF] px-3 py-1 rounded-md text-md hover:bg-[#00D4FF] hover:text-white transition"
                >
                  Discover
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}