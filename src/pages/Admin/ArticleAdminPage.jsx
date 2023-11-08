import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GetToken } from '../../compenents/LoginComponent';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';

const ArticleAdminPage = () => {

    const [articles, setArticles] = useState([])


    useEffect(() => {

        async function getArticles() {

            const articles = await AllArticles()
            const images = await GetArticleImage()
            console.log("Update" + articles)
                   setArticles(articles)
        }

        getArticles()

    }, [])

    useEffect(() => {

     

    }, [articles])

    async function AllArticles() {
        try {
            console.log("Call all Articles");
            const response = await axios.get("https://localhost:7226/api/Article/GetAll")
     
            return response.data


        } catch (err) {
            console.log(err);
        }
    }


    async function DeleteArticle(articleId) {

        try {
            const token = GetToken()

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post("https://localhost:7226/api/Article/Delete", { id: articleId })


            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }


    async function GetArticleImage() {


        for (const article of articles) {
            let imageListRef = ref(storage, `/articles/${article.id}`)

            const res = await listAll(imageListRef)

            if (res.items.length > 0) {
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
        <div>

            <Link to={"/admin"} className='btn btn-primary'> Menu administrateur </Link>

            <h1>Tous les articles</h1>

            {articles && articles.map(article => (
                <div className='article-container' key={article.id} >
                    <h4 className='article-title'> {article.title}</h4>
                    {article.imageURL && <img className='article-image' src={article.imageURL} />}
                    {!article.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}
                    <div className='article-description'>{article.description}</div>
                    <div>{article.content}</div>
                    <button ><Link to={"/article/" + article.id}> Lire </Link>   </button>
                    <button><Link to={"/article/edit/" + article.id}> Editer  </Link></button>
                    <button onClick={DeleteArticle(article.id)}> Supprimer </button>

                </div>
            )


            )}
        </div>
    )
}

export default ArticleAdminPage