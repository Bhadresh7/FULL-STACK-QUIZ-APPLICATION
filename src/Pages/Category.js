import React from 'react'
import { Link, useParams } from 'react-router-dom'
import "../Stylesheets/Category.css"

function Category() {
    const { language } = useParams();
    return (
        <>
            <div className='card'>
                <Link to={`/question/${language}/beginner`}>
                    <div className='card-body'>Beginner</div>
                </Link>
            </div>
            <div className='card'>
                <Link to={`/question/${language}/intermediate`}>
                    <div className='card-body'>intermediate</div>
                </Link>
            </div>
            <div className='card'>
                <Link to={`/question/${language}/advanced`}>
                    <div className='card-body'>advanced</div>
                </Link>
            </div>


        </>
    )
}

export default Category