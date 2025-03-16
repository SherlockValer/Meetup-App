import meetupLogo from '../assets/meetup-1.svg'
import {Link} from 'react-router-dom'
import searchBtn from '../assets/searchBtn.svg'
import '../App.css'
import { useState } from 'react'
import useFetch from './useFetch'

const API_URL = import.meta.env.VITE_API_URL

const Header = () => {
    const[searchTerm, setSearchTerm] = useState("")
    const[filteredEvents, setFilteredEvents] = useState([])
    const {data, loading, error} = useFetch(`${API_URL}/events`)


    const handleInputChange = (e) => {
        const term = e.target.value
        setSearchTerm(term)

        if(data && !error) {
            const filtered = term === "" ? [] : data.filter(event => (
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.tags.join(",").toLowerCase().includes(searchTerm.toLowerCase())
            )) 
            setFilteredEvents(filtered)
        }
    }

    const linkClickHandler = () => {
        setSearchTerm("")
        setFilteredEvents([])
    }


    return (
        <header id="header">
            <div className="container my-3">
                <div className="row d-flex justify-content-between align-items-center">
                    <Link to="/" className='col-md-6' >
                        <img style={{maxWidth: "100px"}} src={meetupLogo} alt="Meetup Logo.svg" />
                    </Link>
                    <div id="search" className='d-flex flex-column justify-content-between' >
                        <div className='d-flex justify-content-start' id="searchBar">
                            <img className='me-2' style={{maxWidth: "25px"}} src={searchBtn} alt="searchBtn" />
                            <input value={searchTerm} onChange={handleInputChange} type="text" placeholder="Search by title and tag" id="searchBarInput" />
                        </div>

                        {
                            filteredEvents && 
                            <ul className='list-group list-group-flush' id="searchList">
                                {
                                    filteredEvents.map(event => (
                                        <li key={event._id} className='list-group-item'>
                                            <Link 
                                                className='d-flex flex-column justify-content-between align-items-start searchLink'
                                                to={`/event/${event.title}`}
                                                onClick={linkClickHandler}
                                            >
                                                <p className='mb-0'><strong>{event.title}</strong></p>
                                                <p>{event.tags.map(tag => (
                                                    <span className='badge text-bg-success me-2'>{tag}</span>
                                                ))}
                                                </p>                                        
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </div>                
                </div>
            </div>

            <hr />
        </header>
    )
}

export default Header