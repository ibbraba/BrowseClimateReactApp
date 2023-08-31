import React from 'react'
import ArticleComponent from '../compenents/ArticleComponent'

const ArticlePage = () => {
  return (
    <div className='page-container'>
        
        <div className="best-articles">
        <h3> Meilleurs articles </h3>
        </div>

      <div className="last-articles">
        <h3>Derniers articles  </h3>

        <ArticleComponent></ArticleComponent>
      </div>


      <div>   
        <h3> Inspiré ? A vous de jouer. </h3>

        <div> 
          
          <h3>Ecrire un article</h3>

          <form method='POST' >
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






        </div>

      </div>


    </div>
  )
}

export default ArticlePage