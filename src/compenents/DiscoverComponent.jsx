import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DecodeUser, GetToken, IsUserLoggedIn } from './LoginComponent'
import { useCallback } from 'react'

const DiscoverComponent = () => {

    const [articles, setArticles] = useState(null)
    const [images, setImages] = useState([])
    const [cities, setCites] = useState([])
    const [user, setUser] = useState(null)
    const [facts, setFacts] = useState([])

    // Fetch Articles from favorite cities 
    // Fecth liked articles from user 
    // Fetch Top articles 
    // Sort articles by date 


    const params = useParams()
    const { id } = params

    async function getDiscoverArticles() {


        if (id != null) {

            try {
                const token = GetToken()

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get("https://localhost:7226/api/Article/GetDiscoverArticles?userId=" + id)
                setArticles(res.data)


            } catch (error) {
                console.log(error);
            }
        }



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
        CheckUserLogged()

        async function LoadDiscoverElements(){
            
            const articles = await getDiscoverArticles()
            const cities = await FetchCities()
            const facts = await FetchFacts()

        }

        LoadDiscoverElements()

    }, [])


    //Fetch cities 

    async function FetchCities() {

        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const cities = await axios.get("https://localhost:7226/api/City/GetAll")

        setCites(cities.data)
    }



    async function FetchFacts(){

        
        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const facts = await axios.get("https://localhost:7226/api/Fact/GetAll")
        setFacts(facts)
        console.log(facts);

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


            <div>
                {cities && cities.map(city => (

                    <div key={city.id}>

                        <h4>{city.name}</h4>


                    </div>
                ))}


            </div>

            <div className='articles-list'>
                {articles && articles.map(article => (
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

        </>
        

    )
}

export default DiscoverComponent