import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DecodeUser, GetToken, IsUserLoggedIn } from './LoginComponent'
import { useCallback } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../firebase'

const DiscoverComponent = () => {

    const [articles, setArticles] = useState(null)
    const [images, setImages] = useState([])
    const [cities, setCites] = useState([])
    const [user, setUser] = useState(null)
    const [facts, setFacts] = useState([])
    const [allObjects, setAllObjects] = useState(null)

    // Fetch Articles from favorite cities 
    // Fecth liked articles from user 
    // Fetch Top articles 
    // Sort articles by date 


    const params = useParams()
    const { id } = params

    
    useEffect(() => {
        CheckUserLogged()

        const allObjects = []
        async function LoadDiscoverElements() {

            console.log("Loading discover elements");
            const articles = await getDiscoverArticles()
            const cities = await FetchCities()
            const facts = await FetchFacts()
            const articleswithImages = await GetArticleImage(articles)
            
            setArticles(articles)

        }

        LoadDiscoverElements()
        console.log("End Loading discover elements");


    }, [])


    useEffect(() => {
        console.log("Change state : sortin arrayg ");


        if (cities && facts && articles) {


            cities.forEach((city) => {
                city.type = "city"
            })


            facts.forEach((fact) => {
                fact.type = "fact"
            })


            articles.forEach((article) => {
                article.type = "article"
            })




            const allObjects = [...cities, ...articles, ...facts]
            allObjects.forEach((object) => {
                object.objKey = allObjects.indexOf(object)
            })



            allObjects.sort(function (x, y) {
                return x.timestamp - y.timestamp;
            })
            setAllObjects(allObjects)

        }
    }, [articles, facts, cities])


    useEffect(() => {

        console.log(articles);

    }, [articles])

    async function getDiscoverArticles() {


        if (id != null) {

            try {
                const token = GetToken()

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get("https://localhost:7226/api/Article/GetDiscoverArticles?userId=" + id)
                setArticles(res.data)
                console.log(res.data);


            } catch (error) {
                console.log(error);
            }
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

    const CheckUserLogged = async () => {

        console.log("Calling CheckUserLogged from main");

        try {
            const user = await IsUserLoggedIn()

            if (user) {
                const decoded = await DecodeUser()
                setUser(decoded)
            }

        } catch (err) {

            console.log(err);
        }

    }
    /* 
        const fetchData = useCallback(async() => {
            const data = await 
    
        }) */



   


    useEffect(() => {
        console.log("All Objects update");
        console.log(allObjects);
    }, [allObjects])

    //Fetch cities 

    async function FetchCities() {

        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const cities = await axios.get("https://localhost:7226/api/City/GetAll")

        setCites(cities.data)

    }



    async function FetchFacts() {


        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const facts = await axios.get("https://localhost:7226/api/Fact/GetAll")


        setFacts(facts.data)

    }


    //Fetch favorite city images 
    //Fetch liked images 
    //Fetch top likes 
    //Display image every 5 elements


    //Fetch Data? 
    //Fetch favorite city data 
    //Fetch liked data 
    //Fetch top Data


    //Sort all data by date to create thread 


    if (user == null) {
        return (
            <>
                <h1> Veuillez vous connecter avant d'explorer</h1>

                <Link to="/login"> Se connecter  </Link>
            </>
        )


    }

    return (
        <>
            <h3>Explorez, découvrez, ressentez </h3>

            <p>Votre fil d'actualité est prêt, bon voyage</p>


            <button>Start Discover</button>


            {/*   <div>
                {allObjects && allObjects.map(city => (

                    <div key={city.id}>

                        <h4>{city.name}</h4>


                    </div>
                ))}


            </div> */}
            {allObjects && allObjects.map((object) =>

                <div key={object.objKey}>
                <p>{object.id}</p>
             
                
                    {object.type === "article" &&
                        <div className='article-container' key={object.objKey} >
                            <h4 className='article-title'> {object.title}</h4>
                            {object.imageURL && <img className='article-image' src={object.imageURL} />}
                            {!object.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}

                            <div className='article-description'>{object.description}</div>
                            <div>{object.content}</div>
                            <button ><Link to={"/article/" + object.id}> Lire </Link>  </button>
                        </div>
                    }


                    {object.type === 'fact' && 
                    
                        <div>
                            <h3>Fact</h3>

                            <p>{object.description}</p>

                        </div>
                    
                    }

                </div>    
            )}




            {/*  <div className='articles-list'>
                {articles && articles.map(article => (
                    <div className='article-container' key={article.id} >
                        <h4 className='article-title'> {article.title}</h4>


                        {article.imageURL && <img className='article-image' src={article.imageURL} />}
                        {!article.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}

                        <div className='article-description'>{article.description}</div>
                        <div>{article.content}</div>
                        <button ><Link to={"/article/" + article.id}> Lire </Link>  </button>

                    </div>


                )
                )}

            </div> */}

        </>


    )
}

export default DiscoverComponent