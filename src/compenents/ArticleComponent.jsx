import axios from 'axios';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { storage } from '../firebase';

const ArticleComponent = () => {

    const [articles, setArticles] = useState(null)
    const [filterDate, setFilterDate] = useState(false)


    useEffect(() => {

        async function getArticles() {
            const articles = await AllArticles()
            const articleswithImages = await GetArticleImage(articles)
            articles.sort(function (x, y) {
                return y.timestamp - x.timestamp;
            })
            setArticles(articles)

        }

        getArticles()

    }, [])

    useEffect(() => {


    }, [filterDate])


    useEffect(() => {
        console.log("updat");
    }, [articles])

    function sortByDate() {
        if (articles) {


            const newarticles = [... articles]
            newarticles.sort(function (x, y) {
                return y.timestamp - x.timestamp;
            })
            setArticles(newarticles)
        }

    }


    function sortByView() {

        if (articles) {

            const newarticles = [... articles]
            newarticles.sort(function (x, y) {
                
            setArticles(newarticles)
                return y.views - x.views;
            })

            setArticles(newarticles)

        }

    }

    async function AllArticles() {
        try {
            console.log("Call all Articles");
            const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Article/GetAll")
            console.log(response);
            return response.data


        } catch (err) {
            console.log(err);
        }
    }

    async function GetArticleImage(articles) {

        console.log(articles);

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
        <div className='articles-list'>

            <div className='articles-sort'>

                <p>Trier par : </p>
                <button className='mbutton btn darkbg' onClick={() => { sortByDate() }}> Date </button>

                <button className='mbutton btn darkbg' onClick={() => { sortByView() }} >  Popularité </button>

            </div>

            {articles && articles.map(article => (

                <div className='article-container' key={article.id} >
                    <h4 className='article-title'> {article.title}</h4>
                    <p></p>


                    <p>  {article.likes}  &hearts; </p>
                    {article.imageURL && <img className='article-image mb-5' src={article.imageURL} />}
                    {!article.imageURL && <img className='article-image mb-5' src="../src/assets/images/app/articles/telescope.jpg" />}

                    <div className='mb-5' dangerouslySetInnerHTML={{ __html:article.description}} ></div>  
              
                    <Link className='lbutton btn darkbg' to={"/article/" + article.id}> Lire </Link> 

                </div>


            )
            )}


        </div>
    )
}

export default ArticleComponent