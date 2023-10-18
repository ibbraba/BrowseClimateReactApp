import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleArticleComponent = () => {
    const [article, setArticle] = useState(null)

    const params = useParams()
    const { id }  = params


    useEffect(() => {
        GetArticle()
       console.log("Update:" + article)
   }, [] )

    async function GetArticle(){
        
        console.log("Call Single article with id " + id);
        const res = await axios.get("https://localhost:7226/api/Article/Get?id=" + id)
        console.log( res.data );
        setArticle( res.data )
       
    }


    if(!article)
    return null
    
    return (
         < div  className='article-container single-article-display'>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p>{article.content}</p>
        
        
    </div>
  )
}

export default SingleArticleComponent