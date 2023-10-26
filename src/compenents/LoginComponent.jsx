import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export function GetToken(){
  const token = localStorage.getItem('bc-token')
  return token
}


export const GetUserLogged = async () => {

  console.log("Calling CheckUserLogged from main");

  try {
      const user = await IsUserLoggedIn()

      if (user) {
          const decoded = await DecodeUser()
          return decoded
      }
      else return null

  } catch (err) {

      console.log(err);
      return null
  }

}

export async function IsUserLoggedIn() {
  const token = localStorage.getItem('bc-token')



  /*  const headers = {
      "Authorization":  token
    }
*/


  if (!token) {

    return false
  } else {

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get("https://localhost:7226/api/User/validate")

    return response
  }
}



export  function DecodeUser() {

  const token = localStorage.getItem('bc-token')
  if (token) {
    console.log("Token detected, decoding user");
    const decoded = jwtDecode(token)

    return decoded

  } else {
    console.error("No token stored")
    return null
  }

}






const LoginComponent = () => {

  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const isLogged = IsUserLoggedIn()
  if (isLogged == true) {
    navigate("/profile")
  }

  async function Login() {
    try {
      console.log("Call login");
      const response = await axios.post(`https://localhost:7226/api/User/login?pseudo=${pseudo}&password=${password}`)
      console.log(response.data);
      localStorage.setItem("bc-token", response.data)
      DecodeUser(response.data)
      navigate("/")

    } catch (err) {
      console.log(err);
    }

    console.log("End call login")

  }

  /**
   * Check if a User is logged in by looking at localstorage token
   */
  async function IsUserLoggedIn() {



  }



  return (
    <div>
      <h3> Connectez-vous </h3>

      <div>
        <form>
          <label> Pseudo </label>
          <input type='text' onChange={(event) => setPseudo(event.target.value)} name='pseudo' />

          <label> Mot se passe </label>
          <input type='text' onChange={(event) => setPassword(event.target.value)} name='password' />

          <button type='submit' onClick={(event) => {
            event.preventDefault()
            Login()
          }}> Se connecter </button>
        </form>

      </div>
    </div>)

}

export default LoginComponent