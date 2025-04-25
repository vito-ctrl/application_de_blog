import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import { createArticle, getAllArticles } from "../services/articleService"; 

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]); // المقالات
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const navigate = useNavigate();  // إضافة

  // استرجاع المقالات من السيرفر
  const fetchArticles = async () => {
    const res = await getAllArticles();  // استرجاع المقالات
    setArticles(res.data);  // تخزين المقالات في المتغير
  };

  useEffect(() => {
    fetchArticles();  // تحميل المقالات عند تحميل الصفحة
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle(formData);  // إرسال المقال
    setFormData({ title: "", content: "", category: "", image: "" });  // إعادة تعيين البيانات بعد الإرسال
    await fetchArticles();  // إعادة تحميل المقالات بعد الإضافة
    navigate("/articles");  // توجيه المستخدم بعد نشر المقال
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 Ajouter un article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL de l’image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Contenu"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Publier
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">📚 Articles publiés</h2>
      <div className="space-y-4">
        {articles.map((article) => ( // استخدام articles هنا لعرضها
          <div key={article.id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="text-sm text-gray-600">{article.category}</p>
            <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded mt-2" />
            <p className="mt-2">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
