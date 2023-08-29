import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ArticleComponent = () => {
  
    const [articles, setArticles ] = useState(null)


    useEffect(() => {
        AllArticles(), 
        console.log(articles)
    }, [])

    async function AllArticles(){
        try{
            console.log("Call all Articles");
            const response = await axios.get("https://localhost:7226/api/Article/GetAll")
            setArticles(response.data)
            console.log(articles);
            console.log("End call articles");

       }catch(err){
            console.log(err);
        }
    }
  
   
    return (
    <div>ArticleComponent</div>
  )
}

export default ArticleComponent