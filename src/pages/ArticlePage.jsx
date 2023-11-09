import React from 'react'
import ArticleComponent from '../compenents/ArticleComponent'
import { Link } from 'react-router-dom'
import WriteArticleComponent from '../compenents/WriteArticleComponent'

const ArticlePage = () => {
  return (
    <div>
        
        <div className="best-articles">
        <h3> Articles </h3>
        </div>




     
        <ArticleComponent></ArticleComponent>


      <div className='write-article'>   
        <h3> Inspiré ? A vous de jouer. </h3>

        <div> 

          <Link to="/write" className='btn btn-primary'>Ecrire un article</Link>

        </div>

      </div>


    </div>
  )
}

export default ArticlePage