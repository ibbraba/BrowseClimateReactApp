import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleCityComponent = () => {


  const [city, setCity] = useState(null)



  const params = useParams()
  const { id } = params


  useEffect(() => {
    GetCity()
  }, [])


  // Call City properties, Wheather , Pictures, Number of members, Note, Articles about the city

  async function GetCity() {
    try {

      console.log("call single city");
      const response = await axios.get("https://localhost:7226/api/City/Get?id=" + id)
      setCity(response.data)

      console.log("End call city");
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