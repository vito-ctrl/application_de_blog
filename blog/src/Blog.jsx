import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import { getBlogs, deleteBlog } from './BlogCrud.js';

function Blog() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);
    
    const fetchBlogs = async() => {
        try {
            const result = await getBlogs();
            console.log('biiig succes : ', result.data);
            setData(result.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                await deleteBlog(id);
                setData(data.filter(blog => blog.id !== id));
                alert("Blog post deleted successfully!");
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Failed to delete blog post");
            }
        }
    };
    
    const renderImage = (blog) => {
        if (blog.image) {
            return (
                <div className="h-48 overflow-hidden relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                </div>
            );
        } else {
            return (
                <div className="h-48 bg-gradient-to-r from-teal-700 to-teal-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 w-12 h-12">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                </div>
            );
        }
    };

    return (
        <>  
            <div className="max-w-6xl mx-auto px-5">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center my-20 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-teal-700 after:to-teal-500 after:rounded">
                    Latest Blog Posts
                </h1>
                
                <div className="flex justify-center my-8">
                    <Link to={'/create-article'} className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                        </svg>
                        Add New Blog Post
                    </Link>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center min-h-72">
                        <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
                    </div>
                ) : data && data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                        {data.map((item) => (
                            <div 
                                key={item.id} 
                                className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl flex flex-col h-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-gray-600"
                            >
                                {/* Blog content section */}
                                <Link to={`/deatels/${item.id}`} className="flex-grow flex flex-col">
                                    {renderImage(item)}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <span className="flex justify-center text-sm text-teal-500 uppercase tracking-wider font-semibold mb-4 bg-teal-500/10 py-1 px-4 w-40 rounded-full">
                                            {item.catégorie}
                                        </span>
                                        <h2 className="text-xl font-bold text-white mb-3 leading-snug line-clamp-2">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {item.contenu}
                                        </p>
                                    </div>
                                </Link>
                                
                                <div className="flex flex-col space-y-3 p-6 pt-0 border-t border-gray-700">
                                    <Link 
                                        to={`/edit-article/${item.id}`} 
                                        className="flex items-center justify-center bg-teal-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                        Update
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(item.id)} 
                                        className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 bg-gray-800 border border-dashed border-gray-700 rounded-2xl mt-10">
                        <h3 className="text-2xl text-gray-300 font-bold mb-4">No blog posts found</h3>
                        <p className="mb-8 text-lg">Create your first blog post to get started</p>
                        <Link to={'/create-article'} className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-1">
                            Create Blog Post
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default Blog;