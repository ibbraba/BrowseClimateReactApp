import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Index from './pages/indexPage'
import ArticlePage from './pages/ArticlePage'
import CityPage from './pages/CityPage'
import DiscoverPage from './pages/DiscoverPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SingleArticlePage from './pages/SingleArticlePage'
import CityComponent from './compenents/CityComponent'
import SingleCityPage from './pages/SingleCityPage'
import { DecodeUser, IsUserLoggedIn } from './compenents/LoginComponent';
import jwtDecode from 'jwt-decode'
import AdminComponent from './compenents/AdminComponent'
import AdminPage from './pages/Admin/AdminPage'
import ArticleAdminPage from './pages/Admin/ArticleAdminPage'
import UserAdminPage from './pages/Admin/UserAdminPage'
import ImagesAdminPage from './pages/Admin/ImagesAdminPage'
import CityAdminPage from './pages/Admin/CityAdminPage'
import SingleCityAdminPage from './pages/Admin/SingleCityAdminPage'
import WriteArticlePage from './pages/WriteArticlePage'
import EditArticlePage from './pages/Admin/EditArticlePage'
import HamburgerComponent from './compenents/app/HamburgerComponent'
import RegisterPage from './pages/registerPage'
import InfoPage from './pages/InfoPage'
import FactsAdminPage from './pages/Admin/FactsAdminPage'


function App() {
  const [response, setResponse] = useState(null)
  const [userLogged, setUserLogged] = useState(null)
  const [user, setUser] = useState(null)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)


  useEffect(() => {

    CheckUserLogged()
    console.log(user);

  }, [location.pathname])

  const navigate = useNavigate()




  const client = axios.create({
    baseURL: "https://localhost:7226/api/"
  })



  const CheckUserLogged = async () => {

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

  const toogleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
    console.log("toogle");
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

          <div  onClick={toogleHamburger}>

            <HamburgerComponent ></HamburgerComponent>

          </div>


          <ul className='header-ul' style={{ display: hamburgerOpen ? 'inline' : 'none' }}>
            <li>
              <Link to={"/"}> Acceuil</Link>
            </li>
            <li>
              <Link to={"/city"}> Villes </Link>
            </li>
            <li><Link to={"/article"}>Articles</Link></li>
            {user && <li> <Link to={"/discover/" + user.UserId}>Discover</Link></li>}
            {!user && <li><Link to={"/discover/0"}>Discover</Link></li>}

            {user && <li><Link to={"/profile"}>Profil</Link></li>}
            {!user && <li><Link to={"/login"}>Connectez-vous</Link></li>}

          </ul>


        </nav>

      </header>






      <div className='page-container'>
        <Routes>

          {/* APP */}

          <Route path='/' element={<Index></Index>}></Route>
          <Route path='/article' element={<ArticlePage></ArticlePage>}></Route>
          <Route path='/city' element={<CityPage></CityPage>}></Route>
          <Route path='/discover/:id' element={<DiscoverPage></DiscoverPage>}></Route>
          <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/article/:id' element={<SingleArticlePage></SingleArticlePage>}></Route>
          <Route path='/article/edit/:id' element={<EditArticlePage></EditArticlePage>}></Route>
          <Route path='/city/:id' element={<SingleCityPage></SingleCityPage>}></Route>

          <Route path='/profile/:id' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/infopage' element={<InfoPage></InfoPage>}></Route>
          <Route path='/write' element={<WriteArticlePage></WriteArticlePage>}></Route>


          {/* ADMIN */}

          <Route path='/admin' element={<AdminPage></AdminPage>}> </Route>
          <Route path='/admin/article' element={<ArticleAdminPage></ArticleAdminPage>}> </Route>
          <Route path='/admin/article/edit/:id' element={<EditArticlePage></EditArticlePage>}></Route>
          <Route path='/admin/user' element={<UserAdminPage></UserAdminPage>}> </Route>
          <Route path='/admin/image' element={<ImagesAdminPage></ImagesAdminPage>}> </Route>
          <Route path='/admin/city' element={<CityAdminPage></CityAdminPage>}></Route>
          <Route path='/admin/city/:id' element={<SingleCityAdminPage></SingleCityAdminPage>}></Route>
          <Route path='/admin/facts' element={<FactsAdminPage></FactsAdminPage>}></Route>


        </Routes>


      </div>




      <footer>


        <h4 className='footer-quote'>Explore your world</h4>



        <div>
        <p>Mentions légales</p>
        <p>Politique de confidentilité</p>

        </div>


      </footer>

    </>
  )
}

export default App