import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CityAdminPage = () => {
  
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
      <>
      
      <Link to={"/admin"} className='btn btn-primary'> Menu administrateur </Link>
      

      
      <div className='cities-list'>
        {cities && cities.map(city =>
          
          <div style={{"backgroundImage" : `url(../src/assets/images/city/${city.name.trim()}.jpg)`  }} className="card city-card"  key={city.id} >
            
            <div className="card-body"  >
              <h5 className="card-title">{city.name}</h5>
              <p className="card-text">{city.country}</p>
          
              <button className='btn btn-info'><Link to={"/admin/city/" + city.id  }> Editer les informations</Link> </button>
       
            </div>
          </div>
        )}
      </div>
      </>
    )


}




export default CityAdminPage