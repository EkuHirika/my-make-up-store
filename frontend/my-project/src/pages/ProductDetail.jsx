import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import Navbar from "../components/Navbar";
import defaultImg from "../assets/img/product-default-image.png";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductById(Number(id)).then(setProduct);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-[#FFF5E1]">
        <h1 className="border text-3xl p-5 w-full flex justify-center border-[#00D4FF] ">
          {product.brand_name}
        </h1>

        <div className="border border-[#00D4FF] flex  justify-center border-t-0 pl-15 pr-15 min-h-[600px] w-full">
          {/* <h1>Product Details for ID: {id}</h1> */}
          <section className="border w-[50%]">
            <img className="w-full h-full object-hover" src={defaultImg} alt="Img of the product" />
          </section>
          <section className="border w-[50%]">
            <div className="">
              <p className="font-bold text-2xl">{product.name}</p>
              <p>{product.category_name}</p>
            </div>

            <div className="flex flex-col">
              <p>Stock: {product.stock}</p>
              <p>{product.price}€</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
