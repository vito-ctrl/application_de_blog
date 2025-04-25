import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // إذا لم يكن المستخدم متصلًا، لا نعرض Navbar

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <span className="text-xl font-semibold">📖 Blog App</span>
      <div className="flex items-center">
        <Link to="/articles" className="mr-4 text-white">
          Articles
        </Link>
        <Link to="/create-article" className="mr-4 text-white">
          Ajouter Article
        </Link>
        <span className="mr-4">👋 {user.username}</span>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
