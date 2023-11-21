import { CardHeader } from '@mui/material'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

const FactsAdminPage = () => {

    const [facts, setfacts] = useState(null)
    const [cities, setCities] = useState(null)
    const [city, setSelectedCity] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setsuccessMessage] = useState(null)
    const [intitule, setIntitule] = useState("")
    const [description, setDescription] = useState("")
    useEffect(() => {

        LoadFacts()
        FetchCities()

    }, [])

    useEffect(() => {


    }, [facts, cities, errorMessage, successMessage])

    async function LoadFacts() {

        const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Fact/GetAll")
        if (res.status == 200) {
            console.log(res.data);
            setfacts(res.data)
        }

    }



    async function FetchCities() {


        const cities = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")

        setCities(cities.data)

    }


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
        <div>

            {successMessage && <div className='alert alert-success'> {successMessage} </div>}
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}

            <h1> Facts </h1>

            <div>

                <h3> Ecrire un fact</h3>

                <form>

                    {cities && <>

                        <label htmlFor=""> Choisir une ville </label>

                        <select className='admin-city-select' onChange={(e) => { setSelectedCity(e.target.value); console.log(e.target.value); }} name="" id="">
                            <option value="all">Selectionnez une ville </option>

                            {cities && cities.map((city) => (

                                <option key={city.id} value={city.id}> {city.name} </option>

                            ))}


                        </select>

                    </>
                    }

                    <div className="form-group">

                        <label htmlFor=""> Intitulé </label>
                        <input type='text' onChange={(e) => setIntitule(e.target.value)} />

                    </div>

                    <div className="form-group">

                        <label htmlFor=""  >  Fact </label>
                        <input type='text' onChange={(e) => setDescription(e.target.value)} />

                    </div>

                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); SendFact() }}> Envoyer </button>

                </form>

            </div>


            <div >

                <h3>Liste des facts </h3>

                {facts && facts.map((fact) => <div key={fact.id}>

                    <Card>
                        <CardHeader>
                            {fact.title}
                        </CardHeader>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>{fact.description}</p>

                            </blockquote>
                        </Card.Body>

                        <Card.Footer>
                            <button className='btn btn-danger' onClick={(e) => DeleteFact(fact.id)}> Supprimer </button>
                        </Card.Footer>

                    </Card>
                        

                    </div>
                )}

                </div>




        </div>
            )
}

            export default FactsAdminPage