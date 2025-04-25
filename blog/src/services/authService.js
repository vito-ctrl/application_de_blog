import axios from "axios";

// رابط قاعدة البيانات الخاصة بك (JSON Server)
const API_URL = "http://localhost:3001/users";

// تسجيل المستخدم
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
  }
};

// تسجيل الدخول
export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: { email, password },
    });
    // إذا تم العثور على المستخدم
    if (response.data.length > 0) {
      return response.data[0]; // إرجاع أول مستخدم (إذا كان موجودًا)
    } else {
      return null; // لا يوجد مستخدم مطابق
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return null;
  }
};
