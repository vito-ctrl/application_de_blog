import axios from "axios";

const API = "http://localhost:3001/articles";

// الحصول على جميع المقالات
export const getAllArticles = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// إنشاء مقال جديد مع رابط صورة (وليس رفع ملف)
export const createArticle = async (article) => {
  try {
    const res = await axios.post(API, article); // إرسال البيانات مباشرة
    return res.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// حذف مقال
export const deleteArticle = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};

// تحديث مقال
export const updateArticle = async (id, article) => {
  try {
    const res = await axios.put(`${API}/${id}`, article);
    return res.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
