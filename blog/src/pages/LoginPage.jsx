import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ استيراد useAuth

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ استخدام login من السياق

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(form.email, form.password);
    if (user) {
      alert("Connexion réussie !");
      login(user); // ✅ حفظ المستخدم في السياق
      navigate("/create-article"); // ✅ التوجيه إلى صفحة إنشاء مقال
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🔐 Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
