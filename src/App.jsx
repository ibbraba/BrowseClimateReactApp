import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Index from './pages/indexPage'
import ArticlePage from './pages/ArticlePage'
import CityPage from './pages/CityPage'
import DiscoverPage from './pages/DiscoverPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SingleArticlePage from './pages/SingleArticlePage'
import CityComponent from './compenents/CityComponent'
import SingleCityPage from './pages/SingleCityPage'
import {DecodeUser, IsUserLoggedIn} from  './compenents/LoginComponent';
import jwtDecode from 'jwt-decode'
import AdminComponent from './compenents/AdminComponent'
import AdminPage from './pages/Admin/AdminPage'
import ArticleAdminPage from './pages/Admin/ArticleAdminPage'
import UserAdminPage from './pages/Admin/UserAdminPage'
import ImagesAdminPage from './pages/Admin/ImagesAdminPage'


function App() {
  const [response, setResponse] = useState(null)
  const [userLogged, setUserLogged] = useState(null)
  const [user, setUser] = useState(null)



  useEffect(() => {

    CheckUserLogged()     
    console.log(user);

  }, [location.pathname])
  
  const navigate = useNavigate()


  const client = axios.create({
      baseURL : "https://localhost:7226/api/"
    })  



    const CheckUserLogged = async () =>   {

      console.log("Calling CheckUserLogged from main");

      try{
        const user = await IsUserLoggedIn()

        if(user){
          const decoded = await DecodeUser()
          setUser(decoded)
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


      <header>

      <h3 className='bc-top'>Browse Climate</h3>
      <p className='bc-speech'>Explore your world</p>


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
            {user &&  <li><Link to={"/profile/" + user.UserId}>Profil</Link></li>}
            {!user &&
            
            <li><Link to={"/login"}>Connectez-vous</Link></li>
            
            
            }
           
          </ul>
        </nav>
       
      </header>

      <div className='page-container'>
      <Routes>
          <Route path='/' element={<Index></Index>}></Route>
          <Route path='/article' element={<ArticlePage></ArticlePage>}></Route>
          <Route path='/city' element={<CityPage></CityPage>}></Route>
          <Route path='/discover/:id' element={<DiscoverPage></DiscoverPage>}></Route>
          <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/article/:id' element={<SingleArticlePage></SingleArticlePage>}></Route>
          <Route path='/city/:id' element={<SingleCityPage></SingleCityPage>}></Route>
          <Route path='/profile/:id' element={<ProfilePage></ProfilePage>}></Route> 
          <Route path='/admin' element={<AdminPage></AdminPage>}> </Route>
          <Route path='/admin/articles' element={<ArticleAdminPage></ArticleAdminPage>}> </Route>
          <Route path='/admin/user' element={<UserAdminPage></UserAdminPage>}> </Route>
          <Route path='/admin/images' element={<ImagesAdminPage></ImagesAdminPage>}> </Route>
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