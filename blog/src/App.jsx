import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Blog from "./Blog";
import AddBlog from "./AddBlog";
import EditArticlePage from "./pages/EditArticlePage"; 
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Deatels from "./pages/Deatels";

function App() {
  const location = useLocation();
  const isAuth = localStorage.getItem("user");

  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!hideNavbar && isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <Blog/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-article/:id"
          element={
            <ProtectedRoute>
              <EditArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deatels/:id"
          element={
            <ProtectedRoute>
              <Deatels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-article"
          element={
            <ProtectedRoute>
              <AddBlog/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-article/:id"
          element={
            <ProtectedRoute>
              <EditArticlePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
