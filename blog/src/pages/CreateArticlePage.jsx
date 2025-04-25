import { useState } from "react";
import { createArticle } from "../services/articleService"; // تأكد من إنشاء هذا السيرفيس
import { useNavigate } from "react-router-dom";

const CreateArticlePage = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle(form);
    navigate("/articles"); // التوجيه إلى صفحة عرض المقالات بعد الإضافة
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📄 Ajouter un article</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Titre de l'article"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Contenu de l'article"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Ajouter</button>
      </form>
    </div>
  );
};

export default CreateArticlePage;
