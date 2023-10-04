import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Link, Route, Routes } from 'react-router-dom'
import Index from './pages/indexPage'
import ArticlePage from './pages/ArticlePage'
import CityPage from './pages/CityPage'
import DiscoverPage from './pages/DiscoverPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SingleArticlePage from './pages/SingleArticlePage'
import CityComponent from './compenents/CityComponent'
import SingleCityPage from './pages/SingleCityPage'
import {IsUserLoggedIn} from  './compenents/LoginComponent';

function App() {
  const [response, setResponse] = useState(null)
  const [userLogged, setUserLogged] = useState(null)


  useEffect(() => {
      CheckUserLogged()
  }, [])
  

  const client = axios.create({
      baseURL : "https://localhost:7226/api/"
    })  



    async function CheckUserLogged() {
      try{
        const res =await IsUserLoggedIn()
        console.log(res.data);
        if(res.data == true){
          console.log("User logged");
          setUserLogged(true)
          
        }else{
          console.log("User not logged");
          setUserLogged(false)
        }
        
      }catch(err){
       
        console.log(err);
      }

      
    }
/*



    useEffect(() => {
      
      console.log("calling getData");
      //getData()
      console.log("endCall");
    })

*/
    async function getData() {
      const response = await client.get("App/Index");
      setResponse(response.data);
      console.log(response);
    }

  return (
    <>
      <h3 className='bc-top'>Browse Climate</h3>
      <p className='bc-speech'>Explore your world</p>

      <header>


        <nav>
          <ul className='header-ul'>
            <li>
              <Link to={"/"}> Acceuil</Link>
            </li>
            <li>
              <Link to={"/city"}> Villes </Link>
              </li>
            <li><Link to={"/article"}>Articles</Link></li>
            <li><Link to={"/discover"}>Discover</Link></li>
            {userLogged &&  <li><Link to={"/profile"}>Profil</Link></li>}
            {!userLogged && <li><Link to={"/login"}>Connectez-vous</Link></li>}
           
          </ul>
        </nav>
       
      </header>

      <div>
      <Routes>
          <Route path='/' element={<Index></Index>}></Route>
          <Route path='/article' element={<ArticlePage></ArticlePage>}></Route>
          <Route path='/city' element={<CityPage></CityPage>}></Route>
          <Route path='/discover' element={<DiscoverPage></DiscoverPage>}></Route>
          <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/article/:id' element={<SingleArticlePage></SingleArticlePage>}></Route>
          <Route path='/city/:id' element={<SingleCityPage></SingleCityPage>}></Route>
          <Route path='/profile/:id' element={<ProfilePage></ProfilePage>}></Route> 
       </Routes>


      </div> 

   
    

      <footer>


        <h4 className='footer-quote'>Explore your world</h4>


        <p>Mentions légales</p>
        <p>Politique de confidentilité</p>


      </footer>

    </>
  )
}

export default App