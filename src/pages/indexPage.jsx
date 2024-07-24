import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { DecodeUser, IsUserLoggedIn } from '../compenents/LoginComponent';

const IndexPage = () => {

  const [user, setUser] = useState(null)


  useEffect(() => {

      CheckUserLogged()

  },[])


  useEffect(() => {

  }, [user])

  async function CheckUserLogged  ()  {

    console.log("Calling CheckUserLogged from main");

    try {
      const user = await IsUserLoggedIn()

      if (user) {
        const decoded = await DecodeUser()
        setUser(decoded)
      }

    } catch (err) {

      console.log(err);
    }

  }


  return (
    <div>

      <div className="home-rubrique-container">

        <h3>  Explorez et apprenez  </h3>
        <div className='home homepage-presentation'>


          <p>Vous retrouverez sur Browse Climate une multitude d'informations, d'articles et d'anecdotes dans le seul but de vous faire voyager à travers les plus belles destinations. Nous vous présentons chaque ville afin de vous émerveiller sur sa culture et son dynamisme.</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fcompass.jpg?alt=media&token=8491aeee-958d-4132-8b38-0f05c790250e'></img>
        </div>



      </div>




      <div className='home-rubrique-container'>

        <h3 className='mb-4'> Les plus belles villes du monde sont la  </h3>
        <div className="home homepage-ville">

          <p>Avez-vous déjà rêvé de découvrir les destinations les plus fréquentées et leurs activités. N'attendez pas de partir avant de découvrir vos futures destinations. Paris, Londres, Tokyo, Kuala Lumpur… Visitez les plus belles villes du monde à travers des articles sur leurs plus belles activités et un carrousel d'images. Immersion garantie</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2FtokyoHome.jpg?alt=media&token=8258b8d8-c90e-4ebc-8f9c-fadd841f490c'></img>
        </div>
        <Link className='lbutton btn darkbg' to="/city"> Decouvrir les villes </Link>


      </div>

      <div className="home-rubrique-container">
        <h3 className='mb-4'> Nos plus belles écritures </h3>
        <div className='home homepage-article'>
          <p> Au sein de chaque ville regorge une variété d'histoire mettant en lumière sa grandeur. Histoire, lieux, évenements et activités sont mis à l'honneur à travers ces récits. Le but ? Vous fasciner et vous faire découvrir toutes les fomes de la ville à travers nos articles. Bonne lecture. </p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fpen.jpg?alt=media&token=8a3044cc-2719-4b09-afc1-3d7b3d348c46'></img>
        </div>
        <Link className='lbutton btn darkbg' to="/article"> Lire les articles </Link>
      </div>




      <div className="home-rubrique-container">

        <h3 className='mb-4'> Votre profil, votre monde </h3>
        <div className='home homepage-profile'>
          <p>Rejoignez la communauté Browse Climate en créant votre profil. Vous aurez alors la possibilité de choisir votre ville préférée et de faire grandir votre communauté. Vous aurez également accès à Discover, votre plateforme personnalisée vous présentant du contenu lié à vos préférences. Une section vous est dédiée afin d'écrire vos articles sur vos lieux de tourisme favoris. N'attendez plus pour nous rejoindre.</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fstats.jpg?alt=media&token=9c00d698-750e-4975-95ad-623dc030b587'></img>
        </div>
        {user && <Link className='lbutton btn darkbg' to={"/profile"}> Accédez à votre profil  </Link>}
        {!user && <Link className='lbutton btn darkbg' to="/login"> Connectez-vous et découvrez toutes les fonctionalités  </Link>}
      </div>





    </div>
  )
}

export default IndexPage