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


          <p>Vous retrouverez sur Browse Climate une multitude d'informations, d'articles et d'anecdotes dans le seul but de vous faire voyager à travers les plus belles destinations.</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fcompass.jpg?alt=media&token=8491aeee-958d-4132-8b38-0f05c790250e'></img>
        </div>



      </div>




      <div className='home-rubrique-container'>

        <h3 className='mb-4'> Les plus belles villes du monde sont la  </h3>
        <div className="home homepage-ville">

          <p>Paris, Londres, Tokyo, Kuala Lumpur… Visitez les plus belles villes du monde à travers des articles sur leurs plus belles activités et un carrousel d'images. Immersion garantie</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2FtokyoHome.jpg?alt=media&token=8258b8d8-c90e-4ebc-8f9c-fadd841f490c'></img>
        </div>
        <Link className='lbutton btn darkbg' to="/city"> Decouvrir les villes </Link>


      </div>

      <div className="home-rubrique-container">
        <h3 className='mb-4'> Nos plus belles écritures </h3>
        <div className='home homepage-article'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis vero aliquam voluptas obcaecati quibusdam quidem quam, nostrum laudantium nemo commodi inventore facilis doloremque facere? Similique voluptatibus quibusdam itaque id velit suscipit fugiat, molestiae culpa delectus ipsum facilis reiciendis natus quis omnis cupiditate, hic distinctio repellendus minima rem at non dolorem earum magni magnam. Sint quae ab totam architecto molestiae perferendis, deserunt nesciunt iure nobis quis repellat cumque odit in ea!</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fpen.jpg?alt=media&token=8a3044cc-2719-4b09-afc1-3d7b3d348c46'></img>
        </div>
        <Link className='lbutton btn darkbg' to="/article"> Lire les articles </Link>
      </div>




      <div className="home-rubrique-container">

        <h3 className='mb-4'> Votre profil, votre monde </h3>
        <div className='home homepage-profile'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, enim ut saepe provident maxime eius cumque tempore voluptates iste, dignissimos quia temporibus laboriosam. Est voluptates assumenda dignissimos nam temporibus, cupiditate autem sint vitae dolorum, doloribus ut? Vel perferendis quas, laborum, pariatur nisi praesentium animi quae distinctio delectus quis, nihil repudiandae amet fugit repellat aperiam! Error, dolorum quisquam! Neque facere voluptatibus necessitatibus quod? Dolorem, error dolores. Ducimus adipisci voluptatem reprehenderit, ullam beatae amet facilis natus sint ratione consequatur incidunt porro! Corporis neque blanditiis ex dicta? Delectus.</p>

        </div>
        {user && <Link className='lbutton btn darkbg' to={"/profile"}> Accédez à votre profil  </Link>}
        {!user && <Link className='lbutton btn darkbg' to="/login"> Connectez-vous et découvrez toutes les fonctionalités  </Link>}
      </div>





      <div className="home-rubrique-container">
        <h3>  </h3>
        <div className="home homepage-stats">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus voluptatibus atque distinctio exercitationem natus accusantium sapiente nostrum quis. Voluptas, libero!</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fstats.jpg?alt=media&token=9c00d698-750e-4975-95ad-623dc030b587'></img>
        </div>


      </div>


    </div>
  )
}

export default IndexPage