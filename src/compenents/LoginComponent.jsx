import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'



export async function IsUserLoggedIn(){
    const token = localStorage.getItem('bc-token')
    console.log(token);


  /*  const headers = {
      "Authorization":  token
    }
*/
    console.log("Calling Token validation...");

    if(!token) {

      return false
    }else{

      axios.defaults.headers.common['Authorization'] = `Bearer      ${token}` ;
      const response = await axios.get("https://localhost:7226/api/User/validate" )

      return response
    }
}



const LoginComponent = () => {

    const [pseudo, setPseudo ] = useState("")
    const [password, setPassword ] = useState("")
  
    

    
    async function Login() {
        try{
            console.log("Call login");
            const response = await axios.post(`https://localhost:7226/api/User/login?pseudo=${pseudo}&password=${password}`)
            console.log(response.data);
            localStorage.setItem("bc-token", response.data)    
            DecodeUser(response.data)

        }catch(err){
            console.log(err);
        }

        console.log("End call login")
        
    }
   
    /**
     * Check if a User is logged in by looking at localstorage token
     */
    async function IsUserLoggedIn(){

       
        
    }

    async function DecodeUser(token){

        const decoded = jwtDecode(token)
        console.log(decoded);

    }


    return (
    <div>  
        <h3> Connectez-vous </h3>

        <div>
            <form>
                <label> Pseudo </label>
                <input type='text' onChange={(event) => setPseudo(event.target.value)} name='pseudo'/> 

                <label> Mot se passe </label>
                <input type='text' onChange={(event) => setPassword(event.target.value)} name='password'/>

                <button type='submit' onClick={(event) => {
                    event.preventDefault()
                    Login()   
                }}> Se connecter </button>
            </form>

        </div>
    </div>)
  
}

export default LoginComponent