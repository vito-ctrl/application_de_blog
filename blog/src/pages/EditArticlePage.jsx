import { useEffect, useState } from "react";
import { getAllArticles, updateArticle } from "../services/articleService";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", image: "" });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/articles/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(id, form);
      navigate("/articles");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded shadow text-green-300 border border-green-600">
      <h2 className="text-2xl font-bold mb-4 text-green-400">✏️ Modifier l'article</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full p-2 rounded bg-gray-800 text-white border border-green-500"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Contenu"
          className="w-full p-2 rounded bg-gray-800 text-white border border-green-500"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Lien de l'image"
          className="w-full p-2 rounded bg-gray-800 text-white border border-green-500"
        />
        <button className="w-full bg-green-500 text-black p-2 rounded hover:bg-green-600">
          💾 Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditArticlePage;
