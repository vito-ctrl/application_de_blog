import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white p-4 shadow-md flex justify-between items-center">
      <span className="text-xl font-semibold">📖 Blog App</span>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/articles" className="text-white hover:text-green-500 transition-colors duration-300">
              Articles
            </Link>
            <Link to="/create-article" className="text-white hover:text-green-500 transition-colors duration-300">
              Ajouter Article
            </Link>
            <span className="text-white">👋 {user.username}</span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-green-500 transition-colors duration-300">
              Login
            </Link>
            <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
