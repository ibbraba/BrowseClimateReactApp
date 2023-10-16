import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GetToken } from '../../compenents/LoginComponent'

const SingleCityAdminPage = () => {
    const [city, setCity] = useState(null)



    const params = useParams()
    const { id } = params
  
  
    useEffect(() => {
      GetCity()
    }, [])
  
  

    async function  DeleteCity(){

      if(city != null){
        
        try {
              console.log("Delete city called");
                const token = GetToken()

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post("https://localhost:7226/api/City/Delete?id=" + id)
                console.log(response);

            } catch (error) {
                
              console.log(error);
              
            }


        }


    }
    // Call City properties, Wheather , Pictures, Number of members, Note, Articles about the city
  
    async function GetCity() {
      try {
  
        console.log("call single city");
        const response = await axios.get("https://localhost:7226/api/City/Get?id=" + id)
        setCity(response.data)
        console.log(response.data);
        console.log("End call city");
      } catch (error) {
  
        console.log(error);
      }
    }
  
    return(
        <div className='city-container'>
      
  
      
        {city && <div>
  
  
          <div className='city-display'>
  
            <div className='city-informations'>
              <div>{city.country}</div>
              <div>{city.numberResidents} habitants</div>
            </div>
            <div className='city-overview'>
  
              <div className='city-name'>
  
                <h3>{city.name}</h3>
              </div>
  
              Ici overview
  
            </div>
          </div>
  
        </div>}
  
  
  
        <button className='btn btn-danger' onClick={() => DeleteCity()}> Supprimer la ville </button>
  
      </div>


  
    )
  
  
}

export default SingleCityAdminPage