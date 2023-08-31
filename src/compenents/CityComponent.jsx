import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CityComponent = () => {
    
    const [cities, setCities] = useState([])

    
    useEffect(() => {
      GetAllCities()
        console.log("Update effect:")
        console.log(cities);
    }, [])

    async function GetAllCities(){
      try {
      
      console.log("call cities");
      const response =  await axios.get("https://localhost:7226/api/City/GetAll")
      setCities(response.data)

      console.log("End call cities");
      } catch (error) {
        
      console.log(error);
     }
    }
 
    return (
    <div className='cities-list'>
          {cities && cities.map(city =>
              <div key={city.name}>
              <h4>  {city.name}</h4>
              </div>
              
          )}
    </div>
    
  )
}

export default CityComponent