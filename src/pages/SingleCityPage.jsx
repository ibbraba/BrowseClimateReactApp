import axios from 'axios'
import React, { useState } from 'react'
import SingleCityComponent from '../compenents/SingleCityComponent'
import { Typography } from '@mui/material'
import BCLogoComponent from '../compenents/app/BCLogoComonent'

const SingleCityPage = () => {



  return (
    <>


      <SingleCityComponent></SingleCityComponent>
      <BCLogoComponent></BCLogoComponent>
    </>
  )
}

export default SingleCityPage