import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { DecodeUser, GetToken } from './LoginComponent'
import { Link } from 'react-router-dom'

const WriteArticleComponent = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [data, setData] = useState("")
    const [cities, setCities] = useState(null)
    const handleChange = (e, editor) => { setData(editor.getData()) }
    const [selectedCity, setSelectedCIty] = useState("all")
    const [imageUpload, setImageUpload] = useState(null)
    const [incompleteArticleMessage, setIncompleteArticleMessage] = useState(false)
    const [user, setUser] = useState(null)


    useEffect(() => {
        GetAllCities()
        const user = DecodeUser()
        setUser(user)

    }, [])



    async function GetAllCities() {
        try {
            const response = await axios.get("https://localhost:7226/api/City/GetAll")
            setCities(response.data)

            console.log(cities);
        } catch (error) {

            console.log(error);
        }
    }


    async function sendArticle() {

        //VALIDATION 
        if (title != "" && description != "" && data != "") {

            try {

                //SEND DATA TO DB 
                console.log("Sending  ");
                const token = GetToken()

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const res = await axios.post("https://localhost:7226/api/Article/Create", {

                    "title": title,
                    "description": description,
                    "content": data,

                    "createdBy": 3,
                    "ImageURL": "null"

                })

                console.log(res);

            } catch (error) {
                console.log(error);
            }


        } else {
            setIncompleteArticleMessage(true)
        }



        // SEND IMAGE TO FIREBASE 


        //SUCCESS MESSAGE
        console.log(data);

    }

    if(user == null){
        return(
            <>
            <h1> Veuillez vous connecter avant d'explorer</h1>

            <Link to="/login"> Se connecter  </Link>
            </>
        )


    }


    return (
        <div className='write-article-container'>

            <select className='admin-city-select' onChange={(e) => setSelectedCIty(e.target.value)} name="" id="">Séléctionnez une ville
                <option value="all" > Choisir une ville </option>
                {cities && cities.map(city => (
                    <option value={city.name} key={city.id}> {city.name}</option>
                ))}

            </select>


            <div className='form-group'>
                <label htmlFor="">Choisissez l'image de l'article</label>
                <input type='file' onChange={e => setImageUpload(e.target.files[0])}></input>
            </div>





            <div className='form-group'>
                <label htmlFor=""> Titre de l'article</label>
                <input type='text' onChange={(e) => setTitle(e.target.value)} />
            </div>


            <div className='form-group'>
                <label htmlFor=""> Description</label>
                <input type='text' placeholder='Decrivez votre article en quelques lignes' onChange={(e) => setDescription(e.target.value)} />
            </div>



            <CKEditor editor={ClassicEditor}
                onChange={(e, editor) => { handleChange(e, editor) }}

            ></CKEditor>
            <p>{data}</p>

            {incompleteArticleMessage &&
                <div className='alert alert-danger'>Veuillez indiquer le titre, la description et le contenu de l'article. </div>
            }
            <button onClick={() => sendArticle()}> Envoyer  </button>

        </div>

    )
}

export default WriteArticleComponent