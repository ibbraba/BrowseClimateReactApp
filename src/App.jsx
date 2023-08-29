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

function App() {
  const [response, setResponse] = useState(null)

  const client = axios.create({
      baseURL : "https://localhost:7226/api/"
    })  


    useEffect(() => {
      
      console.log("calling getData");
      //getData()
      console.log("endCall");
    })


    async function getData() {
      const response = await client.get("App/Index");
      setResponse(response.data);
      console.log(response);
    }

  return (
    <>

      <header>

      <h3>Browse Climate</h3>
        <p>Explore the world</p>

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
            <li><Link to={"/profile"}>Profil</Link></li>
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
       </Routes>


      </div>

   
    

      <footer>

        <p>Mentions légales</p>
        <p>Politique de confidentilité</p>


      </footer>

    </>
  )
}

export default App
