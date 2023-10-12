import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GetToken } from '../../compenents/LoginComponent';

const ArticleAdminPage = () => {
    
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
    

    async function DeleteArticle(articleId){

        try {
            const token = GetToken()

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post("https://localhost:7226/api/Article/Delete", {id: articleId})
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }


    return (
    <div>

    <Link to={"/admin"} className='btn btn-primary'> Menu administrateur </Link>

    <h1>Tous les articles</h1>    

    { articles && articles.map(article => (
        <div key={article.id} >
            <h4 className='article-title'> {article.title}</h4>                
            <div className='article-description'>{article.description}</div>
            <div>{article.content}</div>
            <button ><Link to={"/article/" + article.id }> Lire </Link>  </button>
            <button > Editer </button>
            <button onClick={DeleteArticle(article.id)}> Supprimer </button>

        </div>

                

    ) 


        )}
    </div>
    )
}

export default ArticleAdminPage