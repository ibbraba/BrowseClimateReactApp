import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../firebase'

const SingleCityAdminPage = () => {

  const [city, setCity] = useState(null)
  const [imagesUrls, setImageUrls] = useState(null)
  const [permission, setpermission] = useState(false)

  const [cityName, setCityName] = useState(null)
  const [country, setCountry] = useState(null)
  const [description, setDescription] = useState(null)
  const [numberResidents, setNumberResidents] = useState(0)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccesMessage] = useState(null)

  useState(() => {

    verifyAdminPermission()

  }, [])

  useState(() => {

  }, [permission])

  useEffect(() => {

  }, [city])

   const navigate = useNavigate()

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
        navigate("/admin/city")

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

  async function EditCity() {

    try {



 

      const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/City/Update", {
        "id": city.id,
        "name": cityName ? cityName : city.name,
        "country": country ? country : city.country,
        "description": description ? description : city.description,
        "numberResidents": numberResidents ? parseInt(numberResidents) : city.numberResidents,
        "createdAt": "2023-12-08T08:43:48.603Z",
        "timeZone": "string",
        "lat": 0,
        "lon": 0,
        "temperature": 0,
        "imageURL": "string",
        "facts": [],
        "timestamp": 0,
        "note": 0,
        "numberFans": 0
      })

      console.log(res);
      setErrorMessage(false)
      setSuccesMessage("Ville modifiée !")
      GetCity()

    } catch (error) {

      console.log(error);
      setSuccesMessage(false)
      setErrorMessage("Une erreur est survenue")

    }

  }



  return (



    <div className='city-container'>
      {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
        <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

      </div>}


      {city && permission && <div>

        <Link to="/admin" className='btn lbutton darkbg mb-4'> Menu administrateur </Link>

        {successMessage && < div className="alert alert-success"> {successMessage} </div>}
        {errorMessage && <div className="alert alert-danger"> {errorMessage} </div>}


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
              <input onChange={(e) => setCityName(e.target.value)}  type="text" className='login-input' placeholder='Nom de la ville' defaultValue={city.name.trim()} />
            </div>

            <div className="form-group">
              <input onChange={(e) => setCountry(e.target.value)} type="text" className='login-input' placeholder='Pays' defaultValue={city.country.trim()} />
            </div>


            <div className="form-group">
              <input onChange={(e) => setNumberResidents(e.target.value)} type="number" className='login-input' placeholder='Nombre de résidents' defaultValue={city.numberResidents} />
            </div>


            <div className="form-group">
              <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Descritpion de la ville' className='login-input' defaultValue={city.description} />
            </div>

            <button onClick={(e) => { e.preventDefault(); EditCity() }} className='btn lbutton darkbg'> Mettre à jour les informations </button>

          </form>


        </div>


        <button className='btn lbutton whitebg' onClick={() => DeleteCity()}> Supprimer la ville </button>
      </div>
      }




    </div>



  )


}

export default SingleCityAdminPage