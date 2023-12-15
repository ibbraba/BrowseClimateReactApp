import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from "../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import bg from '../assets/images/city/bangkok.jpg'


const CityComponent = () => {

  const [cities, setCities] = useState(null)

  const [imagesUrls, setImageUrls] = useState([])
  const [callOk, setCallOK] = useState(false)



  useEffect(() => {

    async function getCities() {
      const citiesRes = await GetAllCities()
      const citiesURL = await getimagesItems(citiesRes)
      setCities(citiesURL)
      console.log(cities);
      /*    cities.forEach(city => {
           city.name  = city.name.replace(" ", "")
           console.log(city.name.trim());
         }); */
    }

    getCities()


  }, [])


  useEffect(() => {

    if (cities) {

    getimagesItems()
    }


  }, [cities])


  useEffect(() => {

    console.log(imagesUrls);

  }, [imagesUrls])

  useEffect(() => {
    console.log("Call OK");
  }, [callOk])

  async function GetAllCities() {
    try {
      const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")
      return response.data

    } catch (error) {

      console.log(error);
    }


  }




  async function getimagesItems(cities) {

    const newCities = [...cities]

    for (let city of newCities) {

      const mainImageFolder = ref(storage, `/city/${city.name.trim()}/presentation`);
      const res = await listAll(mainImageFolder)
      console.log(city.name);
      console.log(res);

      if(res.items[0]){

        const url = await getDownloadURL(res.items[0])
        console.log(url);
        city.imageURL = url
      }



    }

    return newCities


  }

  async function getImagesUrls() {
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

          let cityName = item._location.path
          cityName = cityName.replace('presentation/', '')
          cityName = cityName.slice(0, -4)

          const url = await getDownloadURL(item)

          //  console.log("foreach city");


          citiesURL.forEach((city) => {

            if (cityName.trim() === city.name.trim()) {

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

      {cities && cities.map(city =>


         <div style={{ "backgroundImage":   city.imageURL ? `url(${city.imageURL})` : `url(https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fbuilding.jpg?alt=media&token=3d2a399e-25c4-4485-b06e-bc32df5cb582)`    }} className="card city-card" key={city.id} >




          <div className="card-body city-image-infos"  >
            <h5 className="card-title">{city.name}</h5>
          
            <p></p>
            <button className='btn lbutton darkbg'><Link to={"/city/" + city.id}> Visiter </Link>  </button>
          </div>
        </div>



      )}
    </div>
  )


}

export default CityComponent