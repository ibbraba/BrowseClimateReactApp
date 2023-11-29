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


          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facilis odio, ratione placeat quidem iusto, repellat autem, laudantium cumque obcaecati dignissimos! Corporis, nemo quis ullam consequuntur placeat commodi temporibus, exercitationem unde laudantium facere odio voluptatum necessitatibus facilis doloremque nulla! Reprehenderit?</p>
          <img src='../src/assets/images/app/home/compass.jpg'></img>
        </div>



      </div>




      <div className='home-rubrique-container'>

        <h3 className='mb-4'> Les plus belles villes du monde sont la  </h3>
        <div className="home homepage-ville">

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, doloremque voluptatibus pariatur, voluptas quo corporis eius optio vero ab, nihil nobis sunt at quae! Dignissimos dolorum natus tenetur quia veritatis a similique? Veritatis debitis ad distinctio ducimus, quia sunt vel aliquid dolor, nihil at iure? Quo, quas? Consequatur, alias culpa! Eius consectetur atque eaque est perspiciatis, praesentium beatae sequi fugit laborum reiciendis sit provident tempora quis voluptatum odio dignissimos, reprehenderit, sapiente corrupti. Fugiat dolores error quia ad saepe doloribus deleniti!</p>
          <img src='../src/assets/images/app/home/tokyoHome.jpg'></img>
        </div>
        <Link className='lbutton btn darkbg' to="/city"> Decouvrir les villes </Link>


      </div>

      <div className="home-rubrique-container">
        <h3 className='mb-4'> Nos plus belles écritures </h3>
        <div className='home homepage-article'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis vero aliquam voluptas obcaecati quibusdam quidem quam, nostrum laudantium nemo commodi inventore facilis doloremque facere? Similique voluptatibus quibusdam itaque id velit suscipit fugiat, molestiae culpa delectus ipsum facilis reiciendis natus quis omnis cupiditate, hic distinctio repellendus minima rem at non dolorem earum magni magnam. Sint quae ab totam architecto molestiae perferendis, deserunt nesciunt iure nobis quis repellat cumque odit in ea!</p>
          <img src='../src/assets/images/app/home/pen.jpg'></img>
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
          <img src='../src/assets/images/app/home/stats.jpg'></img>
        </div>


      </div>


    </div>
  )
}

export default IndexPage