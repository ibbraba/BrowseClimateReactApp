import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ArticleComponent = () => {
  
    const [articles, setArticles ] = useState(null)


    useEffect(() => {
        AllArticles(), 
        console.log("Update" + articles)
    }, [])

    async function AllArticles(){
        try{
            console.log("Call all Articles");
            const response = await axios.get("https://localhost:7226/api/Article/GetAll")
            console.log(response.data);                 
            setArticles(response.data)
            console.log("End call articles");

       }catch(err){
            console.log(err);
        }
    }
  
   
    return (
    <div className='articles-list'>
        { articles && articles.map(article => (
            <div key={article.id}>
                <h4 className='article-title'> {article.title}</h4>                
                <div className='article-description'>{article.description}</div>
                <div>{article.content}</div>
                <button ><Link to={"/article/" + article.id }> Lire </Link>  </button>

            </div>

            
        ) 
            )}




    </div>
  )
}

export default ArticleComponent