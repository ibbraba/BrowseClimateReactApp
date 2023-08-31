import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SingleArticleComponent from '../compenents/SingleArticleComponent'

const SingleArticlePage = () => {
  
    const [article, setArticle] = useState(null)

    const idDefault = 1006
    


 
  
    return (
    <div>

    
        <SingleArticleComponent></SingleArticleComponent>

    </div>
  )
}

export default SingleArticlePage