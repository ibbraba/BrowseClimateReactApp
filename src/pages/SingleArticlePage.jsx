import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SingleArticlePage = (props) => {
  
    const [article, setArticle] = useState(null)

    const id = 1006

    useEffect(() => {
        GetArticle()
       console.log("Update:" + article)
   }, [] )

    async function GetArticle(){
        console.log("Call Single article");
        const res = await axios.get("https://localhost:7226/api/Article/Get?id=" + id)
        console.log( res.data );
        setArticle(res.data)
       
    }
    
  
    return (
    <div>



    </div>
  )
}

export default SingleArticlePage