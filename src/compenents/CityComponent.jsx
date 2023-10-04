import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/images/city/bangkok.jpg'


const CityComponent = () => {

  const [cities, setCities] = useState([])


  useEffect(() => {
    GetAllCities()
    console.log("Update effect:")
    console.log(cities);
  }, [])

  async function GetAllCities() {
    try {

      console.log("call cities");
      const response = await axios.get("https://localhost:7226/api/City/GetAll")
      setCities(response.data)

      console.log("End call cities");
    } catch (error) {

      console.log(error);
    }
  }




  return (
    <div className='cities-list'>
      {cities && cities.map(city =>
        
        <div style={{"backgroundImage" : `url(../assets/images/city/${city.name}.jpg)`  }} className="card city-card"  key={city.id} >
          
          <div className="card-body"  >
            <h5 className="card-title">{city.name}</h5>
            <p className="card-text">{city.country}</p>
            <button ><Link to={"/city/" + city.id  }> Visiter </Link>  </button>
          </div>
        </div>
      )}
    </div>

  )
}

export default CityComponent