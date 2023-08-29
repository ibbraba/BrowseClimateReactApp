import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CityComponent = () => {
    
    const [cities, setCities] = useState(null)


    useEffect(() => {
         GetAllCities(), 
        console.log("Update:" + cities)
    }, [])

    async function GetAllCities(){

        console.log("call cities");
        const response =  await axios.get("https://localhost:7226/api/City/GetAll")
        console.log("res " + response.data);
        setCities(response.data)

        console.log("End call cities");
    }
 
    return (
    <div>CityComponent</div>
  )
}

export default CityComponent