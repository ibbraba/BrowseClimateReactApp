import axios from 'axios';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { storage } from '../firebase';

const ArticleComponent = () => {

    const [articles, setArticles] = useState(null)


    useEffect(() => {
       
        async function getArticles(){
            const articles = await AllArticles()
            const articleswithImages = await GetArticleImage(articles)
            setArticles(articles)
        }
            
        getArticles()

    }, [])

    async function AllArticles() {
        try {
            console.log("Call all Articles");
            const response = await axios.get("https://localhost:7226/api/Article/GetAll")
            return response.data
    

        } catch (err) {
            console.log(err);
        }
    }

    async function GetArticleImage(articles){

        console.log(articles);

        for(const article of articles ) {
            let imageListRef = ref(storage, `/articles/${article.id}`)

            const res = await listAll(imageListRef)
    
            if(res.items.length > 0){
                console.log(res);
                console.log("Image on article " + article.id);
                const url = await getDownloadURL(res.items[0])
                article.imageURL = url;
                console.log(article);
            
            }
        }

        console.log(articles);
        return articles

    

    }

    return (
        <div className='articles-list'>
            {articles && articles.map(article =>  (
               
                <div className='article-container' key={article.id} >
                    <h4 className='article-title'> {article.title}</h4>
              
                    
                    {article.imageURL && <img className='article-image' src={article.imageURL}/>} 
                    {!article.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg"/>} 

                    <div className='article-description'>{article.description}</div>
                    <div>{article.content}</div>
                    <button ><Link to={"/article/" + article.id}> Lire </Link>  </button>

                </div>


            )
            )}

          
        </div>
    )
}

export default ArticleComponent