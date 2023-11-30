import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { GetToken, GetUserLogged } from './LoginComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';





const ProfileComponent = () => {


  const [user, setUser] = useState(null)
  const [tab, setTab] = useState(false)
  const [tab2, setTab2] = useState(true)
  const [userArticles, setUserArticles] = useState([])
  const [inputName, setName] = useState("")
  const [inputFirstName, setFirstname] = useState("")
  const [inputEmail, setEmail] = useState("")
  const [inputPassword, setPassword] = useState("")
  const [inputavoriteCity, setInputFavoriteCity] = useState(null)
  const [cities, setCities] = useState(null)
  const [favoriteCity, setFavoriteCity] = useState(null)
  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccesMessage] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const navigate = useNavigate();


  console.log("Init component");

  useEffect(() => {
    GetProfile()


  }, [])


  useEffect(() => {
    if (user) {
      console.log(user);
      FetchUserArticles()
      FetchCities()


    }
  }, [user, tab])

  useEffect(() => {

    if (cities && user) {


      cities.forEach(city => {

        if (city.id == user.favoriteCity) {
          setFavoriteCity(city)

        }

      });

    }



  }, [cities, user])


  useEffect(() => {

  }, [favoriteCity])


  useEffect(() => {

  }, [userArticles])

  useEffect(() => {

  }, [show, successMessage, errorMessage])



  async function GetProfile() {

    try {
      console.log("Fetching User ... ");
      const userLogged = await GetUserLogged()
      const token = GetToken()
      console.log(userLogged);
      if (userLogged) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/User/Get?id=" + userLogged.UserId)
        console.log(res);
        console.log("End RES");


        setUser(res.data)
        setName(res.data.name)
        setFirstname(res.data.firstName)
        setEmail(res.data.email)
        setFavoriteCity(res.data.favoriteCity)
      }

    } catch (err) {
      console.log(err);
    }

  }

  async function FetchCities() {

    const token = GetToken()

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const cities = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")

    setCities(cities.data)

  }


  async function UpdateUser() {

    //Updating informations

    try {
      console.log("Updating User ... ");
      const token = GetToken()

      user.name = inputName 
      user.firstName = inputFirstName
      user.email = inputEmail
      user.password = inputPassword
      user.favoriteCity = inputavoriteCity

      if(inputName == "" || inputFirstName == "" || inputEmail == "" || inputavoriteCity == "test"){

        setErrorMessage("Veuillez renseigner les champs")
        setSuccesMessage(falses)
        return
      }else{
        
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const res = await axios.put("https://browseclimate20231121101412.azurewebsites.net/api/User/Update", {

        "id": user.id,
        "name": user.name,
        "firstName": user.firstName,
        "email": user.email,
        "pseudo": user.pseudo,
        "password": user.password,
        "role": user.role,
        "createdAt": "2023-10-06T12:31:43.456Z",
        "favoriteCity": user.favoriteCity

      })

      if(res.status == 200){
        setUser(res.data)
        setErrorMessage(null)
        setSuccesMessage("Profil mis à jour")
        

      }}
      



    } catch (err) {
      console.log(err);
      setErrorMessage("Une erreur est survenue. Merci de réessayer")
      setSuccesMessage(null)
    }
  }



  async function FetchUserArticles() {

    try {
      console.log("Fetching Articles for User ... ");
      const token = GetToken()

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log(user);
      const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Article/GetUserArticle?id=" + user.id)
      setUserArticles(res.data)

    } catch (error) {
      console.log(error);
    }

  }

  async function DeleteArticle(articleId) {

    try {
      const token = GetToken()
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const res = await axios.delete("https://browseclimate20231121101412.azurewebsites.net/api/Article/Delete?id=" + articleId)
      console.log(res);
      if (res.status === 200) {
        let index = userArticles.findIndex(item => item.id === articleId)
        console.log(index);
        const newArticlesArray = [...userArticles]
        newArticlesArray.splice(index, 1)
        setUserArticles(newArticlesArray)

      }

    } catch (error) {
      console.log(error);
    }

  }

  function Logout() {
    const token = localStorage.getItem('bc-token')
    if (token) {
      localStorage.removeItem("bc-token")
    }
    console.log("User logout ...");
    setUser(null)
    navigate('/')
  }







  return (
    <>
      {!user && <>
        <h1> Veuillez vous connecter avant d'explorer</h1>

        <Link className='btn lbutton darkbg' to="/login"> Se connecter  </Link>
      </>}


      {errorMessage && <Alert variant='danger'> {errorMessage} </Alert>}
      {successMessage && <Alert variant='success'> {successMessage} </Alert>}  


        <img className='my-5 app-photo' src="https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fnikon.jpg?alt=media&token=46e0deca-ca4a-4273-9b61-5c7a9767e0cb" alt="" />

      {user && <>
        <h1>Profil de {user.name} {user.firstName}</h1>


        <div className='profile-page'>

          <div className='profile-page-menu'>
            <ul className='profile-page-menulist'>

              <li>
                <button className='btn lbutton whitebg' onClick={() => { setTab(true); setTab2(false); console.log(tab); }}>Informations du profil</button>
              </li>


              <li>
                <button className='btn lbutton whitebg' onClick={() => { setTab(false); setTab2(true); console.log(tab); }}>

                  Mes articles
                </button>
              </li>

              <li>
                <button className='btn lbutton whitebg' onClick={() => Logout()}>
                  Se deconnecter
                </button>
              </li>


            </ul>
          </div>

          <div className='profile-page-display'>

            {tab && <div>

              <form className='profile-page-form' method='POST' action='https://browseclimate20231121101412.azurewebsites.net/api/User/Update'>

                <div className='form-group'>

                  <label >Nom</label>
                  <input className="form-control" type='text' defaultValue={user.name.trim()} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='form-group'>

                  <label>Prénom</label>
                  <input className="form-control" type='text' defaultValue={user.firstName.trim()} onChange={(event) => setFirstname(event.target.value)} />
                </div>

                <div className='form-group'>

                  <label>Email</label>
                  <input className="form-control" type='mail' defaultValue={user.email.trim()} onChange={(e) => setEmail(e.target.value)} />
                </div>



                <div className='form-group my-3 profile-select-city'>

                  
                  {favoriteCity && <>
                    <label>Ville préférée : {favoriteCity.name} </label>
                    <select className='admin-city-select my-2' defaultValue="test" onChange={(e) => { setInputFavoriteCity(e.target.value); console.log(e.target.value); }} name="" id="">
                      <option value="all">Selectionnez une ville </option>

                      {cities && cities.map((city) => (

                        <option key={city.id} value={city.id}> {city.name} </option>

                      ))}


                    </select>
                    </>
                  }
                </div>




                <button className='btn lbutton darkbg' type='submit' onClick={(e) => {
                  e.preventDefault()
                  UpdateUser()

                }}> Mettre à jour les Informations </button>


              </form>
            </div>}


            {tab2 === true && <div className='profile-articles'>
        
 
              {userArticles && userArticles.map((article) => <div className='profile-article' key={article.id}>


                <h3> {article.title} </h3>

                
                <p>{article.description}</p>

                <div>
                  <Link className='btn lbutton lightbg' to={"/article/" + article.id}> Lire </Link>
                  <Link className='btn lbutton lightbg' to={'/article/edit/' + article.id}>Editer </Link>
                  <Link className='btn lbutton lightbg' onClick={(e) => { DeleteArticle(article.id) }}>Supprimer </Link>
                </div>





              </div>)}
            </div>}

          </div>
        </div>
      </>}
    </>
  )
}

export default ProfileComponent