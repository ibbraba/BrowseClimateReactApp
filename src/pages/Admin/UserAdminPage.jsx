import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent';
import { Link } from 'react-router-dom';
const UserAdminPage = () => {

  const [users, setUsers] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [user, setuser] = useState(null)
  const [permission, setpermission] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useState(() => {

    verifyAdminPermission()

  }, [])

  useState(() => {

  }, [permission])

  useEffect(() => {


    if (userInput == "") {

      setSearchResult(users)
      console.log(users);

    }

    if (userInput != "") {

      console.log("User Input:" + userInput);
      const result = users.filter((user) => user.pseudo.includes(userInput))
      console.log(result);
      setSearchResult(result)

    }
  }, [userInput])


  useEffect(() => {



  }, [users])

  useEffect(() => {

  }, [searchResult])


  //Check if user is admin
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
    AllUsers()
    console.log(users)

  }, [])

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser])


  function DisplayInfo(user) {
    setSelectedUser(user)
    console.log(selectedUser);
  }

  /**
   * Fetch all users
   */
  async function AllUsers() {
    try {

      console.log("Call all Users");
      const token = GetToken()

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/User/GetAll");
      setUsers(response.data)

    } catch (err) {
      console.log(err);
    }
  }

  async function DeleteUser(id) {

    const token = GetToken()
    if (window.confirm("Supprimer l'utilisateur ?")) {
      try {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.delete("https://browseclimate20231121101412.azurewebsites.net/api/User/Delete?id=" + id);

        setErrorMessage(false)
        setSuccessMessage("Utilisateur supprimé !")
        AllUsers()
      } catch (error) {

        setErrorMessage("Une erreur est survenue")
        setSuccessMessage(false)
        console.log(error);

      }
    }

  }




  return (

    <div>


      {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
        <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

      </div>}

      {permission && <>

        {successMessage && <div className='alert alert-success'> {successMessage}  </div>}
        {errorMessage && <div className='alert alert-danger'> {err}  </div>}
        
        <Link to={"/admin"} className='btn lbutton darkbg mb-4'> Menu administrateur </Link>




        <h1>Tous les utilisateurs</h1>




        <input type='text' className='login-input user-input' placeholder='Rechercher un utilisateur' onChange={(e) => setUserInput(e.target.value)} />

        <div className='users-dashboard'>
          <div>
            {users && !searchResult && users.map((u) => (

              <div key={u.id} className='mb-4'>
                <p>{u.pseudo}</p>
                <button className=' btn darkbg lbutton' onClick={() => {

                  DisplayInfo(u)
                }}>Informations </button>
              </div>

            ))}

            {users && searchResult && searchResult.map((u) => (

              <div key={u.id} className='mb-4 admin-info-user'>
                <p>{u.name}</p>
                <button className=' btn whitebg lbutton' onClick={() => {

                  DisplayInfo(u)
                }}>Informations </button>
              </div>

            ))}


          </div>

          {selectedUser &&
            <div >

              <div className='user-informations bordered'>
                <p> Pseudo : {selectedUser.pseudo}   </p>
                <p> Nom : {selectedUser.name} </p>
                <p> Prenom : {selectedUser.firstName} </p>
                <p> Email : {selectedUser.email} </p>
                <p> Role : {selectedUser.role} </p>
              </div>

              <button className='btn lbutton darkbg' onClick={() => DeleteUser(selectedUser.id)}> Supprimer </button>

            </div>
          }
        </div>
      </>}

    </div>

  )
}

export default UserAdminPage