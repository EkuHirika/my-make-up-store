import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();


  return (
    <>
      <h1 className="text-blue-500 text-3xl font-bold mb-4">
        Home Page here!
      </h1>
      <button className="border border-gray-400 rounded-md text-base px-4 py-2 hover:bg-gray-200 transition duration-200" onClick={() => navigate('/products')}>
        Pls explore our products
      </button>
    </>
  )
}
