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
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // لحفظ الأخطاء إن وجدت

  const navigate = useNavigate(); // إضافة التنقل

  // جلب المقالات من الخادم
  const fetchArticles = async () => {
    try {
      setLoading(true); // بداية التحميل
      const res = await getAllArticles(); // جلب المقالات
      setArticles(res.data); // تخزين المقالات في الحالة
    } catch (error) {
      setError("فشل في تحميل المقالات، حاول مرة أخرى لاحقًا"); // معالجة الأخطاء
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  useEffect(() => {
    fetchArticles(); // تحميل المقالات عند تحميل الصفحة
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle(formData); // إرسال المقال
    setFormData({ title: "", content: "", category: "", image: "" }); // إعادة تعيين البيانات بعد الإرسال
    await fetchArticles(); // إعادة تحميل المقالات بعد الإضافة
    navigate("/articles"); // إعادة توجيه المستخدم بعد النشر
  };

  if (loading) {
    return <p>جاري تحميل المقالات...</p>; // عرض نص أثناء التحميل
  }

  if (error) {
    return <p>{error}</p>; // عرض الخطأ إذا حدث
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-green-500">📝 Ajouter un article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded shadow-lg">
        <input
          type="text"
          placeholder="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-green-500 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border border-green-500 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="URL de l’image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border border-green-500 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Contenu"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border border-green-500 rounded bg-gray-700 text-white"
        ></textarea>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
          Publier
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 text-green-500">📚 Articles publiés</h2>
      <div className="space-y-4">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="p-4 bg-gray-800 rounded shadow-lg">
              <h3 className="text-lg font-bold text-green-500">{article.title}</h3>
              <p className="text-sm text-gray-400">{article.category}</p>
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded mt-2" />
              <p className="mt-2 text-gray-300">{article.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">لا توجد مقالات لعرضها</p> // في حالة عدم وجود مقالات
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
