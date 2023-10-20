import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from "../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import bg from '../assets/images/city/bangkok.jpg'


const CityComponent = () => {

  const [cities, setCities] = useState([])

  const [imagesUrls, setImageUrls] = useState([])
  const [callOk, setCallOK] = useState(false)
  


  useEffect(() => {
    
    async function getCities(){
      const cities = await GetAllCities()
      setCities(cities)
      console.log(cities);
    }

    getCities()


  }, [])

  useEffect(() => {
    console.log("Call OK");
  }, [callOk])

  async function GetAllCities() {
    try {
      const response = await axios.get("https://localhost:7226/api/City/GetAll")
      return response.data
    
    } catch (error) {

      console.log(error);
    }


  }



  
  async function getimagesItems() {


    console.log("Get Images");

    let imageListRef = ref(storage, `/presentation`)
    const res = await listAll(imageListRef)
    console.log(res);

    return res.items

}

  async function getImagesUrls(cities) {
  try {

    const items = await getimagesItems()

    if (items != null) {
      const urls = []
      setCallOK(true)
      console.log(cities);
      const citiesURL = [...cities]
      console.log(citiesURL);

      for (const item of items) {
      console.log("Loading cities images ...");

        let cityName =  item._location.path
        cityName =  cityName.replace('presentation/', '')
        cityName = cityName.slice(0, -4)
      
        const url = await getDownloadURL(item)
        
      //  console.log("foreach city");
        

        citiesURL.forEach((city) => {
         
          if(cityName.trim() === city.name.trim()){

            city.imageURL = url
            
            console.log(city);
          }
        })

      }
      console.log(citiesURL);

      setImageUrls(urls)
   

    }
  } catch (error) {

    console.log(error);

  }

}


/* function AddCityImage(){
  if(cities != null && imagesUrls != null){

    //LOOP CITY
    cities.forEach(city => {
      
        imagesUrls.forEach(url)

    });

  }
}
 */



return (
  <div className='cities-list'>
    { cities && cities.map(city =>

      <div style={{ "backgroundImage": `url(../src/assets/images/city/${city.name.trim()}.jpg)` }} className="card city-card" key={city.id} >

        <div className="card-body city-image-infos"  >
          <h5 className="card-title">{city.name}</h5>
          <p className="card-text">{city.imageURL}</p>
          <p></p>
          <button ><Link to={"/city/" + city.id}> Visiter </Link>  </button>
        </div>
      </div>
    )}
  </div>

)
}

export default CityComponent