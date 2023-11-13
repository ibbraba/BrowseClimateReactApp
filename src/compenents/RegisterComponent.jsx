import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'


const RegisterComponent = () => {

    const [name, setName] = useState("")
    const [firstName, setFirstname] = useState("")
    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [favoriteCity, setFavoriteCity] = useState(0)
    const [cities, setCities] = useState([])
    const [formError, setFormError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [successMessage, setSuccessMessage ] = useState(null)

    useEffect(() => {
        GetAllCities()
    }, [])

    useEffect(() => {

    }, [cities])

    useEffect(() => {

        console.log("Error in form");

    }, [formError, errorMessage])


    async function GetAllCities() {
        try {
            const response = await axios.get("https://localhost:7226/api/City/GetAll")
            setCities(response.data)

            console.log(cities);
        } catch (error) {

            console.log(error);
        }
    }



    async function RegisterUser() {

        try {
            
            console.log("Registering user  ....");

        if (password != confirmPassword) {
            setFormError(true)
            setErrorMessage("Les deux mots de passe ne sont pas identiques")
            return
        }

        console.log(favoriteCity);

        const res = await axios.post("https://localhost:7226/api/User/Create", {

            "id": 0,
            "name": name,
            "firstName": firstName,
            "email": email,
            "pseudo": pseudo,
            "password": password,
            "role": "string",
            "createdAt": "2023-11-03T14:45:12.837Z",
            "favoriteCity": favoriteCity,
            "timestemp": 0

        })

        console.log(res);

  
       if(res.status == 200){
        console.log("response OK");

        setFormError(false)
        setErrorMessage("")
        setSuccessMessage("Votre compte a été crée avec succées, vous pouvez desormais vous connecter")
      
       }


        } catch (error) {
            console.log("Error in response");
            console.log();
            setFormError(true)
            if(error.response.data){

                setErrorMessage(error.response.data)
            }else{
                setErrorMessage("Une erreur est survenue, veuillez réessayer")
            }
        }
        //Validate Password 
        


    }


    return (
        <>
            {successMessage && <div className='alert alert-success'> {successMessage} </div>}


            {formError &&  <div className='alert alert-danger' > {errorMessage != "" ? errorMessage : "Une erreur est survenue, veuillez réesayer"} </div>}
            {!successMessage && 
            <form>
                <div className="form-group">
                    <label htmlFor="">Nom</label>
                    <input onChange={(e) => setName(e.target.value)} type='text'></input>
                </div>


                <div className="form-group">
                    <label htmlFor="">Prenom</label>
                    <input type='text' onChange={(e) => setFirstname(e.target.value)}></input>
                </div>


                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type='text' onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="">Choisissez un pseudo</label>
                    <input type='text' onChange={(e) => setPseudo(e.target.value)}></input>
                </div>


                <div className="form-group">
                    <label htmlFor="">Mot de passe</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                </div>




                <div className="form-group">
                    <label htmlFor="">Confirmez votre mot de passe</label>
                    <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="" >Ville Favorite</label>
                    <select onChange={(e) => setFavoriteCity(e.target.value)}>
                        {cities && cities.map(city => (
                            <option value={city.id} key={city.id}> {city.name}</option>
                        ))}


                    </select>
                </div>
                <button type='submit' className='btn btn-primary' onClick={(e) => { e.preventDefault(); RegisterUser() }}> S'inscrire </button>

            </form>
            }
        </>
    )
}

export default RegisterComponent