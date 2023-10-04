import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const ProfileComponent = () => {


    const [user, setUser ] = useState(null)

    
    const params = useParams()
    const { id }  = params


  console.log("Init component");

    useEffect(() => {
        GetProfile()
    }, [])

    async function GetProfile(){
        
        try{
            console.log("Fetching User ... ");
            const res = await axios.get("https://localhost:7226/api/User/Get?id=" + id)
            console.log( res.data );
            setUser( res.data )
        }catch(err){
            console.log(err);
        }

    }

    if(user == null)
    return null

   return (
     <>

     <h1>Profil de {user.name} {user.firstName}</h1>
     
     
       <div className='profile-page'>

        <div className='profile-page-menu'>
          <ul className='profile-page-menulist'>

            <li>Informations du profil </li>
            <li> Articles et commentaires </li>
            <li>Se deconnecter</li>

          </ul>
        </div>

        <div className='profile-page-display'>

        </div>

    </div>
    </>  
  )
}

export default ProfileComponent