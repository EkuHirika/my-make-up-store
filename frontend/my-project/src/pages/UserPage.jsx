import Navbar from "../components/Navbar";
import backgroundImg from "../assets/img/minimal-surrealistic-abstract-background.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import UserInfo from "../components/UserInfo.jsx";
import GuestInfo from "../components/GuestInfo.jsx";

export default function UserPage() {
    const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
        }}
      >
        { user ? <UserInfo/ > : <GuestInfo/ >}
      </div>
    </>
  );
}
