import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../firebase'

const SingleCityAdminPage = () => {

  const [city, setCity] = useState(null)
  const [imagesUrls, setImageUrls] = useState(null)
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


  const params = useParams()
  const { id } = params


  useEffect(() => {

    console.log("CityPage");

    async function GetElementsOfCity() {

      const currentCity = await GetCity()
      await getimagesItems(currentCity)
      console.log(currentCity);
      console.log(imagesUrls);


    }

    GetElementsOfCity()


  }, [])



  async function DeleteCity() {

    if (city != null) {

      try {
        console.log("Delete city called");
        const token = GetToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/City/Delete?id=" + id)
        console.log(response);

      } catch (error) {

        console.log(error);

      }
    }
  }

  async function getimagesItems(currentCity) {

    let imageListRef = ""

    if (currentCity) {

      imageListRef = ref(storage, `/city/${currentCity.name.trim()}`)
    }
    const res = await listAll(imageListRef)
    return res.items
  }

  const getImagesUrls = async () => {
    try {

      const items = await getimagesItems()

      if (items != null) {
        const urls = []

        for (const item of items) {

          const url = await getDownloadURL(item)
          urls.push(url)

        }
        setImageUrls(urls)
      }
    } catch (error) {
      console.log(error);
    }
  }



  // Call City properties, Wheather , Pictures, Number of members, Note, Articles about the city

  async function GetCity() {
    try {

      console.log("call single city");
      const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/Get?id=" + id)
      setCity(response.data)
      console.log(response.data);
      console.log("End call city");
      return response.data
    } catch (error) {

      console.log(error);
    }
  }

  return (



    <div className='city-container'>
      {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
        <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

      </div>}


      {city && permission && <div>



        <div className='city-overview'>

          <div className='city-name'>

            <h3>{city.name}</h3>
          </div>

          Ici overview

        </div>

        <div className='city-display'>


          <div className='city-informations'>
            <div>{city.country}</div>
            <div>{city.numberResidents} habitants</div>

          </div>

          <form className='admin-city-form' action="">

            <div className="form-group">
              <input type="text" className='login-input' placeholder='Nom de la ville' defaultValue={city.name.trim()} />
            </div>

            <div className="form-group">
              <input type="text" className='login-input' placeholder='Pays' defaultValue={city.country.trim()} />
            </div>


            <div className="form-group">
              <input type="number" className='login-input' placeholder='Nombre de résidens' defaultValue={city.numberResidents} />
            </div>


            <div className="form-group">
              <textarea placeholder='Descritpion de la ville' className='login-input' defaultValue={city.description} />
            </div>

            <button className='btn lbutton darkbg'> Mettre à jour les informations </button>

          </form>


        </div>


        <button className='btn lbutton whitebg' onClick={() => DeleteCity()}> Supprimer la ville </button>
      </div>
      }




    </div>



  )


}

export default SingleCityAdminPage