import React from 'react'
import { Link, Route, useParams } from 'react-router-dom'

const InfoPage = (props) => {


    const params = useParams()
    const { message } = params


    return (

        <>

            <div className='alert alert-success'>

                { message && message}
            
            </div>

            
            <Link to="/" className="btn btn-primary">Acceuil </Link>
        </>
    )
}

export default InfoPage