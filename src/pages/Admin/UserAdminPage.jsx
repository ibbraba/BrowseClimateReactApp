import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetToken } from '../../compenents/LoginComponent';
import { Link } from 'react-router-dom';
const UserAdminPage = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    AllUsers()
    console.log(users)

  }, [])

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

  return (

    <div>


      <Link to={"/admin"} className='btn btn-primary'> Menu administrateur </Link>


      <h1>Tous les utilisateurs</h1>



      <div>
        {users && users.map((u) => (

          <div key={u.id}>
            <p>{u.name}</p>
            <button>Informations </button>
          </div>

        ))}


      </div>



    </div>

  )
}

export default UserAdminPage