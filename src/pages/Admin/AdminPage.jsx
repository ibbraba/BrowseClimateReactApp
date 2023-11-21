import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DecodeUser, GetToken } from '../../compenents/LoginComponent'

const AdminPage = () => {


    const [user, setuser] = useState(null)
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


    return (

        <div>

            {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
                <Link to="/" className='btn btn-primary'> Retour à l'acceuil</Link>

            </div>}
            {permission && <>
                <h1>Interface administrateur</h1>

                <div>
                    <h2>Menu</h2>

                    <ul>
                        <li><Link to="/admin/article"> Articles</Link></li>
                        <li><Link to="/admin/city">Villes</Link></li>
                        <li><Link to="/admin/user"> Utilisateurs </Link> </li>
                        <li><Link to="/admin/image">Images</Link></li>
                        <li><Link to="/admin/facts"> Facts </Link></li>

                    </ul>





                </div>

            </>}



        </div>



    )
}






export default AdminPage