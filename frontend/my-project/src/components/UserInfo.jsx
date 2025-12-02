import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        // <-- clears token + userData + sets user=null
    navigate("/user");
  };

  return (
    <div>
      <h2>User Information</h2>

      <button onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
