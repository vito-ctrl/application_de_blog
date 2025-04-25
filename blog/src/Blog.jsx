import React, {useEffect, useState} from "react";
import './Blog.css'
import Header from "./components/Header";
import { Link } from "react-router-dom";  
import {getBlogs} from './BlogCrud.js'

function Blog() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getdata = async() => {
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
        getdata();
    }, []);

    return (
        <>  
            <Header/>
            <div className="blog-container">
                <h1 className="page-title">Latest Blog Posts</h1>
                
                <Link to={'/AddBlog'} className="add-blog-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                    </svg>
                    Add New Blog Post
                </Link>
                
                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                    </div>
                ) : data && data.length > 0 ? (
                    <div className="blog-grid">
                        {data.map((item) => (
                            <div className="blog-card" key={item.id}>
                                <div className="blog-card-content">
                                    <span className="blog-category">{item.catégorie}</span>
                                    <h2 className="blog-title">{item.title}</h2>
                                    <p className="blog-preview">{item.contenu}</p>
                                    <div className="blog-footer">
                                        <a href="#" className="read-more">
                                            Read More
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{marginLeft: '4px'}}>
                                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>No blog posts found</h3>
                        <p>Create your first blog post to get started</p>
                        <Link to={'/AddBlog'} className="add-blog-button">
                            Create Blog Post
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default Blog;