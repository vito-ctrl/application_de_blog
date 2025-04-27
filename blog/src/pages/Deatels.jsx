import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Deatels() {
    const { id } = useParams()
    const [form, setForm] = useState({ title: "", content: "", image: "" })
    useEffect(() => {
        const fetchArticle = async () => {
          try {
            const res = await axios.get(`http://localhost:3001/articles/${id}`);
            setForm(res.data);
          } catch (error) {
            console.error("Erreur de chargement :", error);
          }
        };
    
        fetchArticle();
      }, [id]);
      console.log(id)
  return (
    <div>Deatels</div>
  )
}
