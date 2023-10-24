import axios from 'axios'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../firebase'

const SingleCityComponent = () => {


  const [city, setCity] = useState(null)
  const [imagesUrls, setImageUrls] = useState(null)



  const params = useParams()
  const { id } = params


  useEffect(() => {
    console.log("GetCity");

    GetCity()
  }, [])



  useEffect(() => {
    console.log("ImagesURLS called");
    if(city) {

      getImagesUrls()
    }
  }, [city])

  async function getimagesItems() {

    let imageListRef = ref(storage, `/city/` + city.name.trim())




    const res = await listAll(imageListRef)
    console.log(res);
    return res.items

  }

  const getImagesUrls = async () => {
    try {

      const items = await getimagesItems()

      if (items != null) {
        const urls = []

        for (const item of items) {

          const url = await getDownloadURL(item)
          console.log(url);
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
      console.log(response.data);
      return response.data
    } catch (error) {

      console.log(error);
    }
  }





  return (
    <div className='city-container'>
      {city && <div>


        <div className='city-display'>

          <div className='city-informations'>
            <div>{city.country}</div>
            <div>{city.numberResidents} habitants</div>
          </div>
          <div className='city-overview'>

            <div className='city-name'>



              {imagesUrls && imagesUrls.map((url) => (
                <img key={url} src={url}></img>
              ))}

              <h3>{city.name}</h3>
            </div>

            Ici overview

          </div>
        </div>

      </div>}




    </div>



  )
}

export default SingleCityComponent