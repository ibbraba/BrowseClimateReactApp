import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'

const CityAdminPage = () => {

  const [cities, setCities] = useState([])
  const [user, setuser] = useState(null)
  const [permission, setpermission] = useState(false)

  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [numberResidents, setNumberResidents] = useState(0)
  const [file, setFile] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useState(() => {

    verifyAdminPermission()

  }, [])

  useState(() => {

  }, [permission])


  async function verifyAdminPermission() {
    const token = GetToken()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get("https://localhost:7226/api/User/validate")
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
      const response = await axios.get("https://localhost:7226/api/City/GetAll")
      setCities(response.data)

      console.log("End call cities");
    } catch (error) {

      console.log(error);
    }
  }


  async function AddCity() {

    if (cityName == "" || country == "" || description == "" || numberResidents == 0 || file == null) {
      setErrorMessage("Veuillez renseigner les champs")
      return
    }

    try {
      const res = await axios.post("https://localhost:7226/api/City/Create", {

      "id": 0,
      "name": cityName,
      "country": country,
      "description": description,
      "numberResidents": parseInt(numberResidents),
      "createdAt": "2023-12-07T20:24:14.133Z",
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
        <Link to={"/admin"} className='btn lbutton darkbg mb-4'> Menu administrateur </Link>

        <div className="add-city">

          {errorMessage && <div className='alert alert-danger'> {errorMessage} </div>}

          <h3> Ajouter une ville </h3>


          <form>

            <div className="form-group">

              <input onChange={(e) => setCityName(e.target.value)} className='login-input large-input' type='text' placeholder='Nom de la ville' />
            </div>

            <div className="form-group">

              <input onChange={(e) => setCountry(e.target.value)} className='login-input large-input' type='text' placeholder='Pays' />

            </div>

            <div className="form-group">

              <input onChange={(e) => setNumberResidents(e.target.value)} className='login-input large-input' type='number' placeholder='Nombre de résidents' />

            </div>

            <textarea onChange={(e) => setDescription(e.target.value)} className='login-input large-input' placeholder='Description de la ville'> </textarea>

            <div className="form-group">

              <input onChange={(e) => setFile(e.target.files[0])} className='login-input large-input' type='file' placeholder='Choisir une image' />

            </div>

            <div className="form-group">

              <button onClick={(e) => { e.preventDefault(); AddCity() }} className='btn lbutton whitebg'> Ajouter la ville </button>

            </div>



          </form>





        </div>

        <div className='cities-list'>
          {cities && cities.map(city =>

            <div style={{ "backgroundImage": `url(../src/assets/images/city/${city.name.trim()}.jpg)` }} className="card city-card" key={city.id} >

              <div className="card-body"  >
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">{city.country}</p>

                <Link className='btn lbutton darkbg' to={"/admin/city/" + city.id}> Editer </Link>

              </div>
            </div>
          )}
        </div>
      </>}

    </>
  )


}




export default CityAdminPage