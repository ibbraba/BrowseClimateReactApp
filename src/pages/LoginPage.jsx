import React, { useEffect, useState } from 'react'
import LoginComponent, { IsUserLoggedIn } from '../compenents/LoginComponent'
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [userLogged, setUserLogged] = useState(null)


  const navigate = useNavigate();

  useEffect(() => {
    CheckUser()
  }, [])

  async function CheckUser() {
    const isLogged = await IsUserLoggedIn()

    if (isLogged.data == true) {
      //TODO DECODE USER TO ADD ID TO ROUTE
      navigate("/profile")

      setUserLogged(true)
    } else {
      setUserLogged(false)
    }
  }



  return (
    <>
      {!userLogged &&
        <div className='login-container'>

          <LoginComponent></LoginComponent>


          <div>

            <h3>Vous n'avez pas de compte ? </h3>
            <Link className='btn lbutton darkbg' to="/register"> S'inscrire</Link>
          </div>




        </div>




      }

    </>

  )
}

export default LoginPage