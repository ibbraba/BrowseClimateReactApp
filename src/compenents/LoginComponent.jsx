import React from 'react'

const LoginComponent = () => {
  return (
    <div>  
        <h3> Connectez-vous </h3>

        <div>
            <form>
                <label> Pseudo </label>
                <input type='text' name='pseudo'/> 

                <label> Mot se passe </label>
                <input type='text' name='password'/>

                <button type='submit'> Se connecter </button>
            </form>

        </div>
    </div>
  )
}

export default LoginComponent