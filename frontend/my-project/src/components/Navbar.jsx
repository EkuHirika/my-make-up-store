import logoImg from "../assets/img/logo_my_make_up_store.png";
import { RxAvatar } from "react-icons/rx";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#FF7A00] flex items-center p-5">
        <img
          className="w-60 h-30 border-2 border-[#FFF5E1] rounded-4xl object-cover"
          src={logoImg}
          alt="logo img"
        />

        <div className="bg-[#FF7A00] w-full mt-[90px]">
          <ul className="flex justify-center gap-15 text-2xl text-[#FFF5E1] mediaMobileLi hidden md:flex">
            <li>All Products</li>
            <li>Hot-Deals</li>
            <li>Trends</li>
            <li>Brands</li>
            <li>Click and Collect</li>
          </ul>
        </div>
        
        <div className="flex-1">
          <ul className="flex justify-end gap-6 text-3xl text-[#FFF5E1]">
            <li>
              <RxAvatar />
            </li>
            <li>
              <MdFavoriteBorder />
            </li>
            <li>
              <IoCartOutline />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
