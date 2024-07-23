import { CardHeader } from '@mui/material'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'
import { Link } from 'react-router-dom'

const FactsAdminPage = () => {

    const [facts, setfacts] = useState(null)
    const [cities, setCities] = useState(null)
    const [city, setSelectedCity] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setsuccessMessage] = useState(null)
    const [intitule, setIntitule] = useState("")
    const [description, setDescription] = useState("")
    const [permission, setpermission] = useState(false)


    useEffect(() => {
        verifyAdminPermission()
        LoadFacts()
        FetchCities()

    }, [])

    useEffect(() => {

    }, [permission])




    useEffect(() => {


    }, [facts, cities, errorMessage, successMessage])

    /**
     * Check if user is admin
     */
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


    /**
     *  Fetch facts 
     */
    async function LoadFacts() {

        let factsResponse = []
        const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Fact/GetAll")
        if (res.status == 200) {
            factsResponse = res.data
        }

        if(factsResponse.length > 0 ){
            const responseCity = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")
            const cities = responseCity.data
            
            for( let fact of factsResponse){
    
                const city = cities.find(x => x.id == fact.cityId)
    
                fact.cityName = city.name
    
            }
        }
        console.log(factsResponse);
        setfacts(factsResponse)
    }



    async function FetchCities() {


        const cities = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")

        setCities(cities.data)



    }

    /**
     * Add a fact
     */
    async function SendFact() {

        try {

            if (intitule != "" && description != "" && city != null) {

                console.log("city:" + city);

                const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Fact/Create", {

                    "id": 0,
                    "title": intitule,
                    "description": description,
                    "createdAt": "2023-11-10T11:07:14.709Z",
                    "cityId": city,
                    "likes": 0,
                    "timestamp": 0

                })

                if (res.status == 200) {
                    console.log(res);
                    LoadFacts()
                    setsuccessMessage("Fact ajouté")
                    setErrorMessage(null)
                }


            } else {
                setErrorMessage("Veuillez renseigner la ville, l'intitulé et le fact.")
                setsuccessMessage(null)
            }


        } catch (error) {

            setErrorMessage(error.response.data)
            console.log(error);
            setsuccessMessage(null)


        }
    }


    async function DeleteFact(id) {

        try {
            console.log("Deleting fact");
            const res = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Fact/Delete?factId=" + id)

            if (res.status == 200) {
                setsuccessMessage("Supprimé !")
                setErrorMessage(null)
                LoadFacts()
            }

        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data)
            setsuccessMessage(null)

        }

    }

    return (
        <>



            {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
                <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

            </div>
            }

            {permission && <div>

                <Link className='btn lbutton darkbg mb-4' to="/admin"> Menu administrateur </Link>


                {successMessage && <div className='alert alert-success'> {successMessage} </div>}
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}


                <div className='write-fact mb-5'>

                    <h1> Facts </h1>


                    <h3> Ecrire un fact</h3>

                    <form className='fact-form'>

                        {cities && <>

                            <select className='admin-city-select mt-5 mb-2' onChange={(e) => { setSelectedCity(e.target.value); console.log(e.target.value); }} name="" id="">
                                <option value="all">Selectionnez une ville </option>

                                {cities && cities.map((city) => (

                                    <option key={city.id} value={city.id}> {city.name} </option>

                                ))}


                            </select>

                        </>
                        }

                        <div className="form-group mt-2">


                            <input placeholder='Saisissez un intitulé' type='text' className='login-input large-input' onChange={(e) => setIntitule(e.target.value)} />

                        </div>

                        <div className="form-group mt-1">


                            <textarea placeholder='Saisissez le fact' aria-label='Fact' type='text' className='login-input large-input' onChange={(e) => setDescription(e.target.value)} />

                        </div>

                        <button className='btn lbutton darkbg ' onClick={(e) => { e.preventDefault(); SendFact() }}> Envoyer </button>

                    </form>

                </div>


                <div >

                    <h3 className='mb-3'>Liste des facts </h3>

                    {facts && facts.map((fact) => <div className='fact-card' key={fact.id}>

                        <Card>
                            <Card.Header>
                                <h3> {fact.cityName} </h3>
                                <h5> {fact.title} </h5>
                            </Card.Header>
                            <Card.Body>

                                <p>{fact.description}</p>


                            </Card.Body>

                            <Card.Footer>
                                <button className='btn lbutton whitebg' onClick={(e) => DeleteFact(fact.id)}> Supprimer </button>
                            </Card.Footer>

                        </Card>


                    </div>
                    )}

                </div>




            </div>}
        </>
    )
}

export default FactsAdminPage