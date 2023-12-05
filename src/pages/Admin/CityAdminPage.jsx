import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'

const CityAdminPage = () => {
  
    const [cities, setCities] = useState([])
    const [user, setuser] = useState(null)
    const [permission, setpermission] = useState(false)

    useState(() => {

        verifyAdminPermission()

    }, [])

    useState(() => {

    }, [permission])


    async function verifyAdminPermission() {
        const token = GetToken()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/User/validate")
            if (res.status != 200) {
                setpermission(false)
                console.log("Permission Denied");
            }

            const user = DecodeUser()
            console.log(user);

            if (user.role == "Admin") {

                setpermission(true)
                console.log("Permission OK");
                return
                
            }
            
            console.log("Permission Denied");
            setpermission(false)
        }
    }




    useEffect(() => {
      GetAllCities()
      console.log("Update effect:")
      console.log(cities);
    }, [])
  
     async function GetAllCities() {
      try {
  
        console.log("call cities");
        const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")
        setCities(response.data)
     
        console.log("End call cities");
      } catch (error) {
  
        console.log(error);
      }
    }
  
  
  
  
    return (
      <>
      {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
                <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

            </div>}
            
      {permission && <>
      <Link to={"/admin"} className='btn lbutton darkbg'> Menu administrateur </Link>
      

      
      <div className='cities-list'>
        {cities && cities.map(city =>
          
          <div style={{"backgroundImage" : `url(../src/assets/images/city/${city.name.trim()}.jpg)`  }} className="card city-card"  key={city.id} >
            
            <div className="card-body"  >
              <h5 className="card-title">{city.name}</h5>
              <p className="card-text">{city.country}</p>
          
              <Link className='btn lbutton darkbg' to={"/admin/city/" + city.id  }> Editer </Link>
       
            </div>
          </div>
        )}
      </div>
      </>}

     </> 
    )


}




export default CityAdminPage