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



        <div className='articles-sort'>

          <p>Trier par : </p> 
          <button> Date </button>
         
          <button> Popularité </button>

        </div>
     
        <ArticleComponent></ArticleComponent>


      <div className='write-article'>   
        <h3> Inspiré ? A vous de jouer. </h3>

        <div> 
          <WriteArticleComponent></WriteArticleComponent>
          <button className='btn btn-primary'>Ecrire un article</button>




    {/*       <form method='POST' >
            <div>
            <label>Titre</label>
            <input type='text' name="title" />
            </div>

            <div> 
            <label htmlFor="description">Description</label>
            <input type='text' name='description' />
            </div>

            <div>
            <label htmlFor='content'>Contenu</label>
            <input type='text' name="content" />
            </div>


            <button type='submit'> Envoyer </button>

          </form>
 */}





        </div>

      </div>


    </div>
  )
}

export default ArticlePage