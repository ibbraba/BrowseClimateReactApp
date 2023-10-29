import axios from 'axios'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../firebase'
import { Typography, Rating } from '@mui/material'
import { GetUserLogged } from './LoginComponent'


const SingleCityComponent = () => {


  const [city, setCity] = useState(null)
  const [imagesUrls, setImageUrls] = useState(null)
  const [note, setNote] = useState(null)
  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState(null)



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

  }, [articles])

  async function getimagesItems() {

    let imageListRef = ref(storage, `/city/` + city.name.trim())

    const res = await listAll(imageListRef)

    return res.items

  }

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


      const response = await axios.get("https://localhost:7226/api/City/Get?id=" + id)
      setCity(response.data)

      return response.data
    } catch (error) {

      console.log(error);
    }
  }

  async function GetArticles(){
    const response = await axios.get("https://localhost:7226/api/Article/GetCityArticle?cityId=" + id)
    
    setArticles(response.data)
    console.log(response);

  }

  async function GetUserNote() {

    try {
      const res = await axios.post(`https://localhost:7226/api/City/GetUserNote?cityId=${city.id}&userId=${user.UserId}`)
      if (res.data == 0) {
        setNote(null)
      } else {
        setNote(res.data)
      }

    } catch (error) {
      console.log(error);
    }


  }




  async function UpdateNote(value) {

    try {

      if (note) {
        console.log("Update note");
        const res = await axios.post(`https://localhost:7226/api/City/UpdateNote?cityId=${city.id}&userId=${user.UserId}&note=${value}`)
        console.log(res);
      } else {
        console.log("new note");

        const res = await axios.post(`https://localhost:7226/api/City/AddNote?cityId=${city.id}&userId=${user.UserId}&note=${value}`)
        console.log(res);

      }
    } catch (error) {
      console.log(error);
    }

  }




  return (
    <div className='city-container'>.

      {user && <div>
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={note}
          onChange={(event, newValue) => {
            setNote(newValue)

            UpdateNote(newValue)
          }}
        />
      </div>}

      {city && <div>



        <h3>{city.name}</h3>

        <div className='city-display'>



          <div className='city-informations'>
            <div> Pays : {city.country} </div>
            <div> Nombre d'habitants : {city.numberResidents} </div>
            <div> Classement BC : {city.country} </div>
            <div> Fans: {city.country} </div>

          </div>
          <div className='city-overview'>

            <div className='single-city-description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi recusandae tempore quibusdam assumenda dolores quis dolore culpa labore non nulla maiores, beatae placeat repudiandae eaque rem, obcaecati, tempora rerum illum. Ipsa rem qui reprehenderit iste sint voluptas ad. Quae inventore placeat facere consectetur obcaecati eaque, perspiciatis ipsam! Deserunt quo at commodi, nobis, accusamus sapiente quam possimus voluptatum, eligendi neque ducimus doloremque qui est. Ea error, doloribus consequatur in consequuntur nisi commodi quasi, inventore explicabo, deleniti molestias animi. Officiis voluptatem voluptatum saepe voluptates in? Voluptatibus sit dignissimos maxime maiores neque commodi error libero omnis, quod quasi in inventore consequatur sint adipisci quis, pariatur repellendus possimus voluptate cupiditate fuga doloremque enim! Alias sunt tenetur ipsum, commodi, nemo ab aut soluta quos esse laborum fugit quaerat repellendus officiis. Numquam, odio odit tempora, in perspiciatis debitis ducimus cupiditate totam eius quae harum aut doloremque, repellat suscipit asperiores incidunt facere eaque eum? Mollitia placeat error alias tenetur repudiandae veritatis asperiores nobis earum cum labore exercitationem est maiores quae odit, eligendi aliquid debitis facilis totam dolorum blanditiis, illum neque tempora suscipit? Molestiae, quos? Repudiandae quas quidem et ipsum, praesentium illo porro tenetur placeat dolorem tempore assumenda molestias cupiditate veniam dolorum consequatur. Commodi iure et quia ad vel animi vero maxime itaque nostrum consequuntur repellat, est tempore quibusdam quam saepe sit, distinctio iusto, quos eaque. Cum maxime impedit omnis saepe amet, voluptatibus quas corrupti veritatis iure praesentium consectetur dolorem atque possimus nobis natus non optio dolor doloremque, animi nisi officia consequuntur soluta autem. Sint cupiditate cumque, ab minus quae cum quaerat nam asperiores magnam nisi obcaecati, iusto, molestiae temporibus tempora ex similique neque necessitatibus ipsam fugiat! Atque inventore, laborum excepturi, labore nihil minus est dolorem modi saepe minima eligendi sequi. Ducimus sapiente facilis possimus autem eligendi, voluptatibus commodi reiciendis quisquam vel nihil doloremque itaque quaerat reprehenderit! Accusamus.</div>



          </div>




        </div>


        <div className='single-city-gallery'>


          {imagesUrls && imagesUrls.map((url) => (
            <img className='single-city-image' key={url} src={url}></img>
          ))}


        </div>


        <div className="single-city-articles">
         
         {articles && articles.map((article) => (
         
         <div key={article.id}>
            
            <h3>{article.title}</h3>


         </div>))}
        </div>

      </div>}




    </div>



  )
}

export default SingleCityComponent