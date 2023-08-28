import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [response, setResponse] = useState(null)

    const client = axios.create({
      baseURL : "https://localhost:7226/api/"
    })


    useEffect(() => {
      
      console.log("calling getData");
      getData()
      console.log("endCall");
    })


    async function getData() {
      const response = await client.get("App/Index");
      setResponse(response.data);
      console.log(response);
    }

  return (
    <>
      <h2> </h2>
    
    </>
  )
}

export default App
