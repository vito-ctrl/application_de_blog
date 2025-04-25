import axios from "axios";

const API = "http://localhost:3001/articles";

// الحصول على جميع المقالات
export const getAllArticles = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // رمي الخطأ لتمكين التعامل معه في المكان الذي يتم فيه استدعاء هذه الدالة
  }
};

// إنشاء مقال جديد
export const createArticle = async (article) => {
  try {
    const res = await axios.post(API, article);
    return res.data; // إرجاع البيانات المضافة (أو يمكنك تجاهلها إذا لم تكن تحتاجها)
  } catch (error) {
    console.error("Error creating article:", error);
    throw error; // رمي الخطأ لتمكين التعامل معه في المكان الذي يتم فيه استدعاء هذه الدالة
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
    return res.data; // إرجاع البيانات المحدثة
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
