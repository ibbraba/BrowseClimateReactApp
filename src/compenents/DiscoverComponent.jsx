import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DecodeUser, GetToken, GetUserLogged, IsUserLoggedIn } from './LoginComponent'
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
    const [showDiscover, setShowDiscover] = useState(false)
    const [favoriteCity, setFavoriteCity] =  useState(null)
    const [userFactLikes, setUserFactLikes] = useState(null)
    // Fetch Articles from favorite cities 
    // Fecth liked articles from user 
    // Fetch Top articles 
    // Sort articles by date 


    const params = useParams()
    const { id } = params

    
    useEffect(() => {
       GetProfile()

        const allObjects = []
        async function LoadDiscoverElements() {


            
            
            const articles = await getDiscoverArticles()
            const cities = await FetchCities()
            const facts = await FetchFacts()
          
            const articleswithImages = await GetArticleImage(articles)
            
            setArticles(articles)

        }

        
        LoadDiscoverElements()


    }, [])

    useEffect(() => {
 

    }, [user])


    useEffect(() => {


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
                return y.timestamp - x.timestamp;
            })
            setAllObjects(allObjects)

        }
    }, [articles, facts, cities])


    useEffect(() => {

       if(articles){
        GetArticleImage()
       
        
       }

    }, [articles])


    useEffect(() => {

        if(cities && user){
           
            cities.forEach(city => {
               
            if(city.id == user.favoriteCity){
                setFavoriteCity(city)
           
            }

            });
        }

    }, [cities])



    useEffect(() => {

        if(facts && !userFactLikes){
            console.log("Loading userFactLikes");
            GetFactsLikedByUser()
        }

    }, [facts])


    useEffect(() => {


        if(userFactLikes){

            console.log("Adding like property to facts ...")
            console.log(facts);
            const newFacts = [...facts]
            newFacts.forEach(fact => {
                
                if(userFactLikes.includes(fact.id)){
                    fact.isLiked = true
                }else{
                    fact.isLiked = false
                }

                
            });

           
            setFacts(newFacts)
            console.log(newFacts);
            console.log(userFactLikes);
            
        }

    }, [userFactLikes])

    async function GetProfile() {

        try {
          
          const userLogged = await GetUserLogged()
          const token = GetToken()
        
          if (userLogged) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/User/Get?id=" + userLogged.UserId)
    
   
    
            setUser(res.data)
           
            setFavoriteCity(user.favoriteCity)
          }
    
        } catch (err) {
          console.log(err);
        }
    
      }


    async function getDiscoverArticles() {


        if (id != null) {

            try {
                const token = GetToken()

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Article/GetDiscoverArticles?userId=" + id)

                for (const article of res.data) {
                  
                    const s = new Date(article.timestamp * 1000).toLocaleDateString()
                 
                    article.date = s
                }
                setArticles(res.data)
            


            } catch (error) {
                console.log(error);
            }
        }



    
    }


    async function GetArticleImage(){

        

        for(const article of articles ) {
            let imageListRef = ref(storage, `/articles/${article.id}`)

            const res = await listAll(imageListRef)
    
            if(res.items.length > 0){
                console.log(res);
                console.log("Image on article " + article.id);
                const url = await getDownloadURL(res.items[0])
                article.imageURL = url;

            
            }
        }

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
  
    }, [allObjects])

    //Fetch cities 

    async function FetchCities() {

        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const cities = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")

        setCites(cities.data)

    }



    async function FetchFacts() {


        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const facts = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Fact/GetAll")


        setFacts(facts.data)

    }

    async function GetFactsLikedByUser(){

        
        if(user) {
            console.log("Loading Facts Likes ...");
            const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Fact/UserLikes?userId=" + user.id)
            console.log(res);       

            if(res.status==200){
                
                setUserFactLikes(res.data)
            }
        }

    }


    async function AddLikeToFact(id){
        
        const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Fact/AddLikeToFact?factId=" +id + "&userId=" + user.id)
        if(res.status == 200){
            console.log("Like ajouté");
        }else{
            console.log(res);

        }
        GetFactsLikedByUser()
    }


    async function DeleteFactLike(id){
        const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Fact/DeleteLike?factId=" + id  + "&userId=" + user.id)
        if(res.status == 200){
            console.log("Like supprimé ");
        }else{
            console.log(res);
        }
        GetFactsLikedByUser()
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


            { !showDiscover && <button onClick={(e) => {setShowDiscover(true)}}>  Start Discover</button>}



            {showDiscover && favoriteCity && <div className='discover-favoritecity'>
                
                <p>Votre ville préférée</p>

                <h5> {favoriteCity.name} </h5>
                
                <p>{favoriteCity.timeZone}
                </p>
                
                <p>{favoriteCity.temperature} °C</p>

                </div>}


            {allObjects && showDiscover && allObjects.map((object) =>



                <div key={object.objKey}>
                <p>{object.id}</p>
             
                
                    {object.type == "article" &&

                        <div>
                              <p className='article-header'>Article</p>
                        <div className='article-container' key={object.objKey} >
                          
                            <p>{object.date }</p>
                            <h4 className='article-title'> {object.title}</h4>
                            {object.imageURL && <img className='article-image' src={object.imageURL} />}
                            {!object.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}

                            <div className='article-description'>{object.description}</div>
                            <div>{object.content}</div>
                            <button ><Link to={"/article/" + object.id}> Lire </Link>  </button>
                        </div>
                        </div>
                    }


                    {object.type === 'fact' && 
                    
                        <div className='single-fact'>
                            <h3>Fact</h3>

                            <p>{object.description}</p>
                            {object.isLiked &&   <button onClick={() => DeleteFactLike(object.id)}>  &#128148;  </button> }
                            {!object.isLiked  &&  <button onClick={() => AddLikeToFact(object.id)}> &hearts;  </button>}
                            

                        </div>
                    
                    }

                </div>    
            )}



        </>


    )
}

export default DiscoverComponent