import axios from "axios";

// L'URL de l'API (votre serveur JSON)
const API_URL = "http://localhost:3001/users";

// Inscription de l'utilisateur
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

// Connexion de l'utilisateur
export const loginUser = async (email, password) => {
  try {
    // Recherche de l'utilisateur avec les informations de connexion
    const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      return response.data[0]; // Renvoie le premier utilisateur trouvé
    } else {
      return null; // Aucune correspondance trouvée
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return null;
  }
};
