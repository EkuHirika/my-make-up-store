import { useState } from "react";
import axios from "axios";

export default function GuestInfo() {
  const [isRegistering, setIsRegistering] = useState(false); // toggle between login/register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        setMessage("Login successful!");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        password,
      });
      if (response.data.success) {
        setMessage("Registration successful! You can now login.");
        setIsRegistering(false); // switch to login after registration
        // optionally, clear registration fields
        setFirstName("");
        setLastName("");
        setPhone("");
        setPassword("");
      } else {
        setMessage("Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="border flex justify-center w-2/3 mx-auto p-10 bg-white rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-3xl">{isRegistering ? "Register" : "Login"}</h2>
      <section>
        <p className="mt-4">
          {isRegistering
            ? "Create an account to enjoy a personalized shopping experience!"
            : "Please login to access your user information and enjoy a personalized shopping experience!"}
        </p>
      </section>

      {isRegistering ? (
        <form className="flex flex-col gap-4 mt-6 mb-6" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <button
            type="submit"
            className="bg-[#FF7A00] text-white p-2 rounded-md w-64 hover:bg-[#e66a00] transition"
          >
            Register
          </button>
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="text-blue-500 underline"
            >
              Login
            </button>
          </p>
        </form>
      ) : (
        <form className="flex flex-col gap-4 mt-6 mb-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md w-64"
          />
          <button
            type="submit"
            className="bg-[#FF7A00] text-white p-2 rounded-md w-64 hover:bg-[#e66a00] transition"
          >
            Login
          </button>
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className="text-blue-500 underline"
            >
              Sign up now
            </button>
          </p>
        </form>
      )}

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
