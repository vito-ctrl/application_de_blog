import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ استيراد useAuth

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ استخدام login من AuthContext

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await registerUser(form);
    if (newUser) {
      alert("Inscription réussie !");
      login(newUser); // ✅ حفظ المستخدم في السياق
      navigate("/create-article"); // ✅ التوجيه مباشرة بعد التسجيل
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
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
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
