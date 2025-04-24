import axios from "axios";

const API_URL = 'http://localhost:3000/blogs';

// Obtenir tous les articles
export const getBlogs = () => {
  return axios.get(API_URL);
};

// Ajouter un article
export const postBlog = (data) => {
  return axios.post(API_URL, data);
};

// Supprimer un article
export const deleteBlog = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Modifier un article
export const updateBlog = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};
