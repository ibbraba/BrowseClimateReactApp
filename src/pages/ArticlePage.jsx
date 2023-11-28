import React from 'react'
import ArticleComponent from '../compenents/ArticleComponent'
import { Link } from 'react-router-dom'
import WriteArticleComponent from '../compenents/WriteArticleComponent'

const ArticlePage = () => {
  return (
    <div>
        
        <div className="best-articles">
        <h3> Articles </h3>

        <p className='articles-intro'>Nos villes regorgent de lieux, d'événements et d'histoires qui ne demandent qu'a être partagées. A travers le temps et les différents endroits du monde, vous decouvrirez un riche ensemble d'histoires pleines d'émotions. Nous espérons que vous apprécierez nos récits et que si le coeur vous en dit, vous partagerez avec nous les vôtres. Bonne lecture.  </p>
        </div>




     
        <ArticleComponent></ArticleComponent>


      <div className='write-article'>   
        <h3> Inspiré ? A vous de jouer. </h3>

        <div> 

          <Link to="/write" className='lbutton btn darkbg'>Ecrire un article</Link>

        </div>

      </div>


    </div>
  )
}

export default ArticlePage