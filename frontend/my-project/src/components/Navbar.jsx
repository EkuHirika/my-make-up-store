import logoImg from "../assets/img/logo_my_make_up_store.png";
import { RxAvatar } from "react-icons/rx";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FF7A00] w-full p-4 flex flex-wrap items-center justify-between">

      {/* LOGO */}
      <img
        className="w-40 h-auto border-2 border-[#FFF5E1] rounded-3xl object-cover"
        src={logoImg}
        alt="logo img"
      />

      {/* MENU */}
      <ul className="hidden md:flex flex-wrap justify-center gap-10 text-2xl text-[#FFF5E1] w-full md:w-auto">
        <li onClick={() => navigate("/products")} className="cursor-pointer">All Products</li>
        <li className="cursor-pointer">Hot-Deals</li>
        <li className="cursor-pointer">Trends</li>
        <li className="cursor-pointer">Brands</li>

        {/* WRAPS on tablet! */}
        <li className="cursor-pointer whitespace-normal text-center max-w-[120px] leading-tight">
          Click and Collect
        </li>
      </ul>

      {/* ICONS */}
      <ul className="flex gap-6 text-3xl text-[#FFF5E1]">
        <li><RxAvatar onClick={() => navigate("/user")} className="cursor-pointer" /></li>
        <li><MdFavoriteBorder className="cursor-pointer" /></li>
        <li><IoCartOutline className="cursor-pointer" /></li>
      </ul>

    </div>
  );
}
