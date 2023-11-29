import React from 'react'
import CityComponent from '../compenents/CityComponent'

const CityPage = () => {
  return (
    <div className='city-page'>
        
        <h1 className='page-title'>Villes</h1>

        

        <div className='articles-intro'>
          <h3> Les lieux à decouvrir </h3>
           <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim iusto eius, obcaecati suscipit eveniet tenetur sed, necessitatibus dolorem officiis accusantium, tempora natus illo numquam. Voluptatem ducimus provident necessitatibus et facere enim minus reiciendis similique numquam aliquam sequi, animi repudiandae tempore aliquid molestiae illo eveniet dolorem nostrum temporibus. Assumenda, aliquam. </p>
        </div>


        <div className="intro">
        <h3>Les plus belles villes à découvrir </h3>
        <CityComponent>  </CityComponent>
        </div>

      

    </div>
  )
}

export default CityPage