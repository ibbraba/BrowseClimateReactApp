import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetToken, GetUserLogged } from './LoginComponent'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../firebase'

const SingleArticleComponent = () => {
    const [article, setArticle] = useState(null)
    const [user, setUser] = useState(null)
    const [articlesLiked, setArticlesLiked] = useState([])
    const [articleLiked, setArticleLiked] = useState(false)
    const [articleImageURL, setArticleImageURL] = useState("")

    const params = useParams()
    const { id } = params



    useEffect(() => {

        GetArticle()
        GetArticleImage()
        async function GetUser() {
            const userLogged = await GetUserLogged()
            if (userLogged)
                setUser(userLogged)
        }

        GetUser()
    }, [])

    useEffect(() => {

        console.log(articleImageURL);

    }, [articleImageURL])


    useEffect(() => {

        if (user) {
            GetUserLikes()
        }

    }, [user])

    useEffect(() => {

        articlesLiked.forEach(article => {
            if (article.id == id) {
                setArticleLiked(true)
            }
        });



    }, [articlesLiked])

    useEffect(() => {
        console.log("Article Liked: " + articleLiked);
    }, [articleLiked])

    useEffect(() => {

        if(article){
            console.log("Loading image ...");
            GetArticleImage();
 
        }
    }, [article])

    async function GetArticle() {

        console.log("Call Single article with id " + id);
        const res = await axios.get("https://localhost:7226/api/Article/Get?id=" + id)
        setArticle(res.data)
    }

    async function GetArticleImage() {
        console.log("Fetching article image");
        const imageListRef = ref(storage, `/articles/` + article.id)
        const res = await listAll(imageListRef)
        const url = await getDownloadURL(res.items[0])
        console.log(url);
        setArticleImageURL(url)
       

    }



async function GetUserLikes() {

    const token = GetToken()

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const res = await axios.post("https://localhost:7226/api/Article/GetArticlesLikedByUser?userId=" + user.UserId)
    console.log(res.data);
    setArticlesLiked(res.data)


}


async function AddLike() {
    const res = await axios.post(`https://localhost:7226/api/Article/AddLike?articleId=${article.id}&userId=${user.UserId}`, {
        articleId: article.Id,
        userId: user.Id
    });

    setArticleLiked(true)
    article.likes = article.likes + 1
}


async function RemoveLike() {
    const res = await axios.post(`https://localhost:7226/api/Article/RemoveLike?articleId=${article.id}&userId=${user.UserId}`, {
        articleId: article.Id,
        userId: user.Id
    });

    article.likes = article.likes - 1
    setArticleLiked(false)
}

if (!article)
    return null

return (
    <div className='article-container single-article-display'>


        <div className='articles-likes-section'>

            {user && articleLiked && <button onClick={() => RemoveLike()}>  &#128148; </button>}
            {user && !articleLiked && <button onClick={() => AddLike()}> &hearts;  </button>}

            <p> {article.likes} likes </p>

        </div>


        <h1>{article.title}</h1>

        {articleImageURL && <img className='article-image' src={articleImageURL} />}
        {!articleImageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}

        <p>{article.description}</p>
       <div dangerouslySetInnerHTML={{ __html:article.content}} ></div>  

    </div>
)
}

export default SingleArticleComponent