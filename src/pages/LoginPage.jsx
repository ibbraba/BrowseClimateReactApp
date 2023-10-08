import React, { useEffect, useState } from 'react'
import LoginComponent, { IsUserLoggedIn } from '../compenents/LoginComponent'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
 
  const [userLogged, setUserLogged] = useState(null)


  const navigate = useNavigate();

  useEffect(() => {
    CheckUser()
  }, [])
   
  async function CheckUser(){
    const isLogged = await IsUserLoggedIn()

    if(isLogged.data == true) {
      //TODO DECODE USER TO ADD ID TO ROUTE
      navigate("/profile")
      
      setUserLogged(true)
    }else{
      setUserLogged(false)
    }
  }
   
 
 
  return (
    <> 
    {!userLogged && 
     <div>LoginPage
     
    <LoginComponent></LoginComponent>
     
     </div>

    }
    </>

  )
}

export default LoginPage