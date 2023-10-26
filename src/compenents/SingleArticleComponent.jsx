import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetToken, GetUserLogged } from './LoginComponent'

const SingleArticleComponent = () => {
    const [article, setArticle] = useState(null)
    const [user, setUser] = useState(null)
    const [articlesLiked, setArticlesLiked] = useState([])
    const [articleLiked, setArticleLiked] = useState(false)

    const params = useParams()
    const { id } = params

    

    useEffect(() => {

        GetArticle()
        
        async function GetUser(){
            const userLogged = await GetUserLogged()
            if(userLogged)
            setUser(userLogged)
        }

        GetUser()     
    }, [])


    useEffect(() => {

        if(user){
            GetUserLikes()
        }

    }, [user]) 

    useEffect(() => {
    
        articlesLiked.forEach(article => {
            if(article.id == id ){
                setArticleLiked(true)
            }
        });

        
        
    }, [articlesLiked])

    useEffect(() => {
        console.log("Article Liked: " + articleLiked);
    }, [articleLiked])

    async function GetArticle() {

        console.log("Call Single article with id " + id);
        const res = await axios.get("https://localhost:7226/api/Article/Get?id=" + id)
        setArticle(res.data)
    }


    async function GetUserLikes(){
        
        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
        const res = await axios.post("https://localhost:7226/api/Article/GetArticlesLikedByUser?userId=" + user.UserId)
        console.log(res.data);
        setArticlesLiked(res.data)


    }

    
    async function AddLike(){
         const res = await axios.post(`https://localhost:7226/api/Article/AddLike?articleId=${article.id}&userId=${user.UserId}`, {
            articleId: article.Id,
            userId : user.Id
        });

        setArticleLiked(true)
        article.likes = article.likes +1
    }     
    

    async function RemoveLike(){
        const res = await axios.post(`https://localhost:7226/api/Article/RemoveLike?articleId=${article.id}&userId=${user.UserId}`, {
            articleId: article.Id,
            userId : user.Id
        });

        article.likes = article.likes -1
        setArticleLiked(false)
    }

    if (!article)
        return null

    return (
        <div className='article-container single-article-display'>
              <div className='articles-likes-section'>

                {user && articleLiked && <button onClick={() => RemoveLike()}>  &#128148; </button> }
                {user && !articleLiked && <button onClick={() => AddLike()}> &hearts;  </button> }
             
                <p> {article.likes} likes </p>
             
              </div>
              
              
            <h1>{article.title}</h1>
              
            {article.imageURL && <img className='article-image' src={article.imageURL} />}
            {!article.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}

            <p>{article.description}</p>
            <p>{article.content}</p>

        </div>
    )
}

export default SingleArticleComponent