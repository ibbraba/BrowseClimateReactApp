import React from 'react'
import DiscoverComponent from '../compenents/DiscoverComponent'

const DiscoverPage = () => {
  return (
    <div>

        <h3>Explorez, découvrez, ressentez </h3>


        <button>Start Discover</button>

        <DiscoverComponent></DiscoverComponent>

        <div className='discover-facts'></div>

    </div>
  )
}

export default DiscoverPage