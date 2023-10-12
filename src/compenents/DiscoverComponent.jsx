import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetToken } from './LoginComponent'

const DiscoverComponent = () => {

    const [articles, setArticles] = useState(null)
    const [images, setImages] = useState(null)
    const [city, cityes] = useState(null)


    // Fetch Articles from favorite cities 
    // Fecth liked articles from user 
    // Fetch Top articles 
    // Sort articles by date 


    const params = useParams()
    const { id } = params


    useEffect(() => {
        console.log("Loading discover");
        getDiscoverArticles()
        console.log(articles);
    }, [])

    async function getDiscoverArticles() {

        console.log("id: " +id );
        if (id != null) {

            try {
                const token = GetToken()

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const articles = await axios.get("https://localhost:7226/api/Article/GetDiscoverArticles?userId=" + id)
          
                setArticles(articles)
            } catch (error) {
                console.log(error);
            }
        }



    }


    async function FetchCities(){
        
    }

    async function fetchTopImages(){

    }




    //Fetch favorite city images 
    //Fetch liked images 
    //Fetch top likes 

    //Fetch cities 

    //Fetch Data? 
    //Fetch favorite city data 
    //Fetch liked data 
    //Fetch top Data


    //Sort all data by date to create thread 

    return (
        <div>

        </div>



    )
}

export default DiscoverComponent