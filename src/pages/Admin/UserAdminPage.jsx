import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetToken } from '../../compenents/LoginComponent';
import { Link } from 'react-router-dom';
const UserAdminPage = () => {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  

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

  async function AllUsers() {
    try {

      console.log("Call all Users");
      const token = GetToken()

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get("https://localhost:7226/api/User/GetAll");
      setUsers(response.data)

    } catch (err) {
      console.log(err);
    }
  }

  async function DeleteUser(id){

    const token = GetToken()

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get("https://localhost:7226/api/User/Delete?id=" + id);

  }

  return (

    <div>


      <Link to={"/admin"} className='btn btn-primary'> Menu administrateur </Link>


      <h1>Tous les utilisateurs</h1>


      <div className='users-dashboard'>
        <div>
          {users && users.map((u) => (

            <div key={u.id}>
              <p>{u.name}</p>
              <button onClick={() => {

                DisplayInfo(u)
              }}>Informations </button>
            </div>

          ))}


        </div>

        {selectedUser &&
          <div className='user-nformations'>

            <div>
              <p> Pseudo : {selectedUser.pseudo}   </p>
              <p> Nom : {selectedUser.name} </p>
              <p> Prenom : {selectedUser.firstName} </p>
              <p> Email : {selectedUser.email} </p>
              <p> Role : {selectedUser.role} </p>
            </div>

            <button className='btn btn-danger' onClick={() => DeleteUser(selectedUser.id)}> Supprimer </button>

          </div>
        }
      </div>


    </div>

  )
}

export default UserAdminPage