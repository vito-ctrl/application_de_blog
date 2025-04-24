import React, { useState } from "react";
import './AddBlog.css';
import Header from "./components/Header";
import { postBlog } from "./BlogCrud.js"; // Import your API functions

function AddBlog() {
    const [formData, setFormData] = useState({
        title: '',
        catégorie: '',
        contenu: ''
    });

    const [err, setErr] = useState({});
    
    const validateForm = () => {
        const newErr = {};
        if (!formData.title.trim()) newErr.title = 'Title is required';
        if (!formData.catégorie) newErr.catégorie = 'Category is required';
        if (!formData.contenu) newErr.contenu = 'Content is required';
        setErr(newErr);
        return Object.keys(newErr).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Use the postBlog function from test.js
                const result = await postBlog(formData);
                console.log("Success: ", result.data);
                // Reset form after successful submission
                setFormData({
                    title: '',
                    catégorie: '',
                    contenu: ''
                });
                alert("Blog post added successfully!");
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to add blog post");
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>  
            <Header/>
            <h1 id="sit_title">Gestion de Blog</h1>
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`${err.title ? 'outline-red-500' : ''}appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                        type="text" 
                        placeholder="Title" 
                        aria-label="Title"
                    />
                </div>
                {err.title && <p className="text-red-500 text-sm mt-1">{err.title}</p>}
                
                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <select 
                        name="catégorie"
                        value={formData.catégorie}
                        onChange={handleChange}
                        className={`${err.catégorie ? 'outline-red-500' : ''}appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Travel">Travel</option>
                        <option value="Food">Food</option>
                    </select>
                </div>
                {err.catégorie && <p className="text-red-500 text-sm mt-1">{err.catégorie}</p>}

                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <textarea
                        name="contenu"
                        value={formData.contenu}
                        onChange={handleChange}
                        rows={4}
                        className={`${err.contenu ? 'outline-red-500' : ''}appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                        placeholder="Contenu" 
                        aria-label="contenu"
                    />
                </div>
                {err.contenu && <p className="text-red-500 text-sm mt-1">{err.contenu}</p>}
                
                <button
                    type="submit"
                    className="mt-6 block w-full rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Submit Blog
                </button>
            </form>
        </>
    );
}

export default AddBlog;