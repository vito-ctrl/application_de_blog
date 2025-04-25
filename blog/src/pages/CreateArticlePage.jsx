import { useState } from "react";
import { createArticle } from "../services/articleService";
import { useNavigate } from "react-router-dom";

const CreateArticlePage = () => {
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle(form);
    navigate("/articles");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-black text-green-400">
      <h2 className="text-2xl font-bold mb-6 text-green-500">📝 Ajouter un nouvel article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titre de l'article"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 text-green-300 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <textarea
          name="content"
          placeholder="Contenu de l'article"
          value={form.content}
          onChange={handleChange}
          rows="5"
          className="w-full p-3 rounded bg-gray-900 text-green-300 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          name="image"
          placeholder="Lien de l'image (URL)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 text-green-300 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full p-3 rounded bg-green-600 hover:bg-green-700 text-black font-bold"
        >
          ➕ Créer l'article
        </button>
      </form>
    </div>
  );
};

export default CreateArticlePage;
