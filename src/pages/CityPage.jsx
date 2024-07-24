import React from 'react'
import CityComponent from '../compenents/CityComponent'

const CityPage = () => {
  return (
    <div className='city-page'>
        
        <h1 className='page-title'>Villes</h1>

        

        <div className='articles-intro'>
          <h3> Les lieux à decouvrir </h3>
           <p>  C'est ici que vous retrouverez les lus grandes villes du monde et leur caractéristiques. Des articles, anectodes et carousel d'images vous sont proposés.  </p>
        </div>


        <div className="intro">
        <h3>Les plus belles villes à découvrir </h3>
        <CityComponent>  </CityComponent>
        </div>

      

    </div>
  )
}

export default CityPage