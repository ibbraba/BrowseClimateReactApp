import React, { useEffect, useState } from 'react'
import WriteArticleComponent from '../../compenents/WriteArticleComponent'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'

const EditArticlePage = () => {

    const [article, setArticle] = useState(null)
    const [permission, setpermission] = useState(false)

    useState(() => {

        verifyAdminPermission()

    }, [])

    useState(() => {

    }, [permission])


    async function verifyAdminPermission() {
        const token = GetToken()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("https://localhost:7226/api/User/validate")
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


    const params = useParams()
    const { id } = params


    useEffect(() => {
        GetArticle()

    }, [])

    async function GetArticle() {

        console.log("Call Single article with id " + id);
        const res = await axios.get("https://localhost:7226/api/Article/Get?id=" + id)
        console.log(res.data);
        setArticle(res.data)


    }


    if (!article)
        return null

    return (
        <>
            {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
                <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

            </div>}

            {permission && <>
            <div>
                <h1>Editer l'article</h1>

                <WriteArticleComponent from="admin" id={id}  ></WriteArticleComponent>

            </div>
            </>}

        </>
    )
}

export default EditArticlePage