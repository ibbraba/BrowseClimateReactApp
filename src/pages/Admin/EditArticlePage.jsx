import React, { useEffect, useState } from 'react'
import WriteArticleComponent from '../../compenents/WriteArticleComponent'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditArticlePage = () => {

    const [article, setArticle] = useState(null)


  
    const params = useParams()
    const { id } = params


    useEffect(() => {
        GetArticle()
        
    }, [])

    async function GetArticle() {

        console.log("Call Single article with id " + id);
        const res = await axios.get("https://localhost:7226/api/Article/Get?id=" + id)
        console.log(res.data);
        setArticle(res.data)

    }


    if (!article)
        return null
  
    return (
        <div>
            <h1>Editer l'article</h1>

            <WriteArticleComponent ></WriteArticleComponent>

        </div>
    )
}

export default EditArticlePage