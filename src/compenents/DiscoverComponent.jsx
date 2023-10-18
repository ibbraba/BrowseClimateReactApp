import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GetToken } from './LoginComponent'
import { useCallback } from 'react'

const DiscoverComponent = () => {

    const [articles, setArticles] = useState(null)
    const [images, setImages] = useState([])
    const [cities, setCites] = useState([])


    // Fetch Articles from favorite cities 
    // Fecth liked articles from user 
    // Fetch Top articles 
    // Sort articles by date 


    const params = useParams()
    const { id } = params

     async function getDiscoverArticles () {

        
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
/* 
    const fetchData = useCallback(async() => {
        const data = await 

    }) */

    useEffect(() => {
     getDiscoverArticles()
     FetchCities() 
    }, [])


        //Fetch cities 

    async function FetchCities() {

        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const cities = await axios.get("https://localhost:7226/api/City/GetAll")
     
        setCites(cities.data)
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




    return (
        <>
        <div> 
            {cities && cities.map(city => (

                <div key={city.id}>

                    <h4>{city.name}</h4>


                </div>
            ))}


        </div>

        <div className='articles-list'>
        { articles && articles.map(article => (
            <div className='article-container' key={article.id} >
                <h4 className='article-title'> {article.title}</h4>                
                <div className='article-description'>{article.description}</div>
                <div>{article.content}</div>
                <button ><Link to={"/article/" + article.id }> Lire </Link>  </button>

            </div>

            
        ) 
            )}

        </div>

    </>    

    )
}

export default DiscoverComponent