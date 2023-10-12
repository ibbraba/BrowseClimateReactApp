import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  
  return (

        <div>
     


        <h1>Interface administrateur</h1>

        <div>
            <h2>Menu</h2>

            <ul>
                <li><Link to="/admin/articles"> Articles</Link></li>
                <li><Link to="/admin/user"> Utilisateurs </Link> </li>
                <li><Link to="/admin/images">Images</Link></li>
            </ul>





        </div>
   
   
   
   
   
    </div>
  
  
  
    )
}






export default AdminPage