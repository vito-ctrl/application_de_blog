import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ArticlesPage from "./pages/ArticlesPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import EditArticlePage from "./pages/EditArticlePage";  // استيراد الصفحة الجديدة
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const isAuth = localStorage.getItem("user");

  // إخفاء الـ Navbar في صفحات التسجيل وتسجيل الدخول
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!hideNavbar && isAuth && <Navbar />} {/* عرض Navbar فقط إذا كان المستخدم مسجل دخول */}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <ArticlesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-article"
          element={
            <ProtectedRoute>
              <CreateArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-article/:id"  // إضافة المسار لتعديل المقال
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
