import { useEffect, useState } from "react";
import { updateBlog } from "../BlogCrud";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: "", 
    contenu: "",
    image: "",
    catégorie: "", 
    image: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("No article ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/blogs/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading article:", error);
        setError("Failed to load article");
        setLoading(false);
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
      await updateBlog(id, form);
      navigate("/articles"); 
    } catch (error) {
      console.error("Error updating article:", error);
      setError("Failed to update article");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            
            setForm({
                ...form,
                image: base64String
            });
        };
        reader.readAsDataURL(file);
    }
}

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded shadow text-red-300 border border-red-600">
      <h2 className="text-2xl font-bold mb-4 text-red-400">❌ Error</h2>
      <p>{error}</p>
      <button 
        onClick={() => navigate(-1)} 
        className="mt-4 w-full bg-green-500 text-black p-2 rounded hover:bg-green-600"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div class="min-h-screen flex fle-col items-center justify-center">
      <div class="py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div class="rounded-lg p-6 max-w-md ">
      <h2 className="text-2xl font-bold mb-4 text-teal-500">✏️ Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center justify-center border-b border-teal-500 py-2">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder={form.title}
            className="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>
        
        <div className="flex items-center justify-center border-b border-teal-500 py-2">
          <select
            name="catégorie"
            value={form.catégorie}
            onChange={handleChange}
            className="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
          </select>
        </div>
        
        <div className="flex items-center justify-center border-b border-teal-500 py-2">
          <textarea
            name="contenu"
            onChange={handleChange}
            rows={4}
            className="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder={form.contenu} 
            aria-label="contenu"
          />
        </div>
        
        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="file_input">
                Product Image
            </label>
            <input 
                className="block w-full text-sm  text-gray-100 border border-teal-500 rounded-lg cursor-pointer bg-black p-3 focus:outline-none" 
                id="file_input" 
                type="file" 
                onChange={handleImageChange}
            />
        </div>
        
        <div className="pt-2">
          <button className="w-full bg-teal-500 text-black p-2 rounded hover:bg-teal-400 flex items-center justify-center">
            <span className="mr-2">💾</span> Save Changes
          </button>
        </div>
        
        <div>
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600 mt-2"
          >
            Cancel
          </button>
        </div>
      </form>
        </div>
        <div class="max-md:mt-8 rounded-lg">
            <img src={form.image} class="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="login img" />
          </div>
      </div>
      </div>
    </div>
  );
};

export default EditArticlePage;