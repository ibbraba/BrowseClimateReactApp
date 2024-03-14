import axios from 'axios'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { storage } from '../firebase'
import { Typography, Rating, Slider, Portal, ListItemButton } from '@mui/material'
import { GetUserLogged } from './LoginComponent'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card } from 'react-bootstrap'

const SingleCityComponent = () => {


  const [city, setCity] = useState(null)
  const [imagesUrls, setImageUrls] = useState(null)
  const [note, setNote] = useState(null)
  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState(null)
  const [facts, setFacts] = useState(null)
  const [userFactLikes, setUserFactLikes] = useState(null)


  const params = useParams()
  const { id } = params


  useEffect(() => {
    async function GetUser() {
      const userLogged = await GetUserLogged()
      if (userLogged)
        setUser(userLogged)

    }

    GetUser()
    GetCity()
    GetArticles()
    GetFacts()
  }, [])


  useEffect(() => {
    console.log(user);
  }, [user])




  useEffect(() => {
    if (city) {
      getImagesUrls()

    }
  }, [city])

  useEffect(() => {

    if (city && user) {
      GetUserNote()
    }

  }, [city, user])


  useEffect(() => {

     console.log(userFactLikes);

    if (facts) {

      if (!userFactLikes) {
        GetFactsLikedByUser()
      }
    }


  }, [facts])

  useEffect(() => {


    if (userFactLikes) {

      console.log("Adding like property to facts ...")
      console.log(facts);
      const newFacts = [...facts]
      newFacts.forEach(fact => {

        if (userFactLikes.includes(fact.id)) {
          fact.isLiked = true
        } else {
          fact.isLiked = false
        }


      });


      setFacts(newFacts)
      console.log(newFacts);
      console.log(userFactLikes);

    }

  }, [userFactLikes])


  useEffect(() => {

  }, [articles])

  async function getimagesItems() {

    let imageListRef = ref(storage, `/city/` + city.name.trim())

    const res = await listAll(imageListRef)

    return res.items

  }

  //Fetch city facts
  async function GetFacts() {

    const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Fact/GetCityFacts?cityId=" + id)
    setFacts(res.data)
    console.log(res.data);

  }

  //Fetch facts liked
  async function GetFactsLikedByUser() {


    if (user) {
      console.log("Loading Facts Likes ...");
      const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Fact/UserLikes?userId=" + user.UserId)
      console.log(res);

      if (res.status == 200) {

        setUserFactLikes(res.data)
      }
    }

  }


  //Fetch images from article
  const getImagesUrls = async () => {
    try {

      const items = await getimagesItems()

      if (items != null) {
        const urls = []

        for (const item of items) {

          const url = await getDownloadURL(item)

          urls.push(url)
        }
        setImageUrls(urls)
        return urls
      }
    } catch (error) {
      console.log(error);
    }
  }


  // Call City properties, Wheather , Pictures, Number of members, Note, Articles about the city

  async function GetCity() {
    try {


      const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/Get?id=" + id)
      setCity(response.data)

      return response.data
    } catch (error) {

      console.log(error);
    }
  }

  async function GetArticles() {
    const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Article/GetCityArticle?cityId=" + id)

    setArticles(response.data)

  }


  
  //Get the user's note
  async function GetUserNote() {

    try {
      const res = await axios.post(`https://browseclimate20231121101412.azurewebsites.net/api/City/GetUserNote?cityId=${city.id}&userId=${user.UserId}`)
      if (res.data == 0) {
        setNote(null)
      } else {
        setNote(res.data)
      }

    } catch (error) {
      console.log(error);
    }


  }

  async function AddLikeToFact(id) {

    const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Fact/AddLikeToFact?factId=" + id + "&userId=" + user.UserId)
    if (res.status == 200) {
      console.log("Like ajouté");
    } else {
      console.log(res);
    }
    GetFactsLikedByUser()
  }


  async function DeleteFactLike(id) {
    const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Fact/DeleteLike?factId=" + id + "&userId=" + user.UserId)
    if (res.status == 200) {
      console.log("Like supprimé ");
    } else {

      console.log(res);
    }
    GetFactsLikedByUser()
  }



  async function UpdateNote(value) {

    try {

      if (note) {
        console.log("Update note");
        const res = await axios.post(`https://browseclimate20231121101412.azurewebsites.net/api/City/UpdateNote?cityId=${city.id}&userId=${user.UserId}&note=${value}`)
        console.log(res);
      } else {
        console.log("new note");

        const res = await axios.post(`https://browseclimate20231121101412.azurewebsites.net/api/City/AddNote?cityId=${city.id}&userId=${user.UserId}&note=${value}`)
        console.log(res);

      }
    } catch (error) {
      console.log(error);
    }

  }




  return (
    <div className='city-container single-city'>.

      {city && <h1 className='single-city-title'> {city.name} </h1>}


      {imagesUrls &&

        <img className='single-city-image' src={imagesUrls[0]}></img>
      }

      { }

      {city && <div>

        {user && <div className='user-rate'>
          <h3>Notez {city.name}</h3>
          <Rating
            name="simple-controlled"
            value={note}
            onChange={(event, newValue) => {
              setNote(newValue)

              UpdateNote(newValue)
            }}
          />
        </div>}


        <div className='city-display'>
          
          <div className='city-informations'>
            <div> Pays : {city.country} </div>
            <div> Nombre d'habitants : {city.numberResidents} </div>
            <div> Note moyenne : {city.note}/5 </div>
            <div> Classement BC : {city.numberFans} </div>
            <div> Fans: {city.numberFans} </div>

          </div>
          <div className='city-overview'>

            <div className='single-city-description'>{city.description}</div>
          </div>
        </div>


        <div className='single-city-facts'>
          {facts && facts.map((fact) => (<div className='fact-card' key={fact.id}>

            <Card>
              <Card.Header>

                <h5> {fact.title} </h5>
              </Card.Header>
              <Card.Body>

                <p>{fact.description}</p>


              </Card.Body>

              <Card.Footer>
                {fact.isLiked && <button onClick={() => DeleteFactLike(fact.id)}>  &#128148;  </button>}
                {!fact.isLiked && <button onClick={() => AddLikeToFact(fact.id)}> &hearts;  </button>}
              </Card.Footer>

            </Card>


          </div>

          ))}


        </div>


        <div className='single-city-gallery'>

          <Carousel>

            {imagesUrls && imagesUrls.map(url => (
              <div className='slide' key={url}>
                <img className='single-city-image' key={url} src={url}></img>

              </div>
            ))}

          </Carousel>

        </div>


        <div className="single-city-articles">



          {articles && articles.length > 0 && <h3 className='my-3'>Articles en lien avec {city.name}</h3>}
          {articles && articles.map((article) => (

            <div key={article.id}>

              <div className='article-container' key={article.id} >
                <h4 className='article-title'> {article.title}</h4>
                <p></p>


                <p>  {article.likes}  &hearts; </p>
                {article.imageURL && <img className='article-image' src={article.imageURL} />}
                {!article.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}

                <div className='article-description'>{article.description}</div>
                <div>{article.content}</div>
                <button ><Link to={"/article/" + article.id}> Lire </Link>  </button>

              </div>


            </div>))}
        </div>

      </div>}




    </div>



  )
}

export default SingleCityComponent