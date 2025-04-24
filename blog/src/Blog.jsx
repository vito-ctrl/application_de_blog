import React, {useEffect, useState} from "react";
import './Blog.css'
import Header from "./components/Header";
import { data, Link } from "react-router-dom";  
import {getBlogs} from './BlogCrud.js'

function Blog() {
    const [Data, setData] = useState()
    // const url = 'http://localhost:3000/blogs'
    useEffect(() => {
        const getdata = async() =>{
            try{
                const result = await getBlogs()
                console.log('biiig succes : ', result.data)
                setData(result.data)
            }catch (error){
                console.error(error)
            }
        }
        getdata()
    },[])
    console.log(Data)
    return (
        <>  
            <Header/>
            <Link to={'/AddBlog'}>
                <button className="flex bg-teal-500 mt-20 ml-80">add blog</button>
            </Link>
            {Data && Data.map((item) => (
                <div className="mt-20">
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </a>
                </div>
                ))
            }

        </>
    );
}

export default Blog