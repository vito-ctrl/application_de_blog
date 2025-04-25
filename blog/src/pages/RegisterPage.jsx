import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ استخدام login من AuthContext

  const onSubmit = async (data) => {
    const newUser = await registerUser(data);
    if (newUser) {
      alert("Inscription réussie !");
      login(newUser); // ✅ حفظ المستخدم في السياق
      navigate("/login"); // ✅ naviguer vers la page de connexion après inscription
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 border border-green-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md">
        <h2 className="text-3xl text-white font-bold text-center mb-6">📝 Inscription</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative my-4">
            <input
              type="text"
              id="username"
              {...register("username", { required: "Nom d'utilisateur requis" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="username" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nom d'utilisateur
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email requis" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="email" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Votre Email
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="password"
              id="password"
              {...register("password", { required: "Mot de passe requis" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="password" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Votre Mot de passe
            </label>
            <AiOutlineLock className="absolute top-4 right-4 text-white" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full mt-6 mb-4 rounded-full bg-green-600 text-white hover:bg-green-700 py-2 transition-colors duration-300"
          >
            S'inscrire
          </button>

          <div className="text-center text-white text-sm">
            <span>Déjà un compte ? </span>
            <Link className="text-green-500" to="/login">Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
