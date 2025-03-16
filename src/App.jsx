import { useEffect, useState } from 'react'
import Header from './components/Header'
import useFetch from './components/useFetch'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const {data, loading, error} = useFetch(`${API_URL}/events`)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedFilter, setFilter] = useState("")

  useEffect(() => {
    if(data.length > 0) {
      setFilteredEvents(data)
    }
  }, [data])

  const handleSelectChange = (e) => {
    const {value} = e.target
    setFilter(value)

    const filtered = value === "Both" || value === "" ? data : data.filter(event => event.eventType === value)
    setFilteredEvents(filtered)

  }



  return (
    <>
      <Header />
      <main className='container'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='pt-3 display-5 fw-medium'>Meetup Events</h2>
          <select onChange={handleSelectChange} id="selectEventType" >
            <option value="">Select Event Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="container grid">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          { filteredEvents && 
            filteredEvents.map(event => (
              <div className="d-flex flex-column">
                <img id="leadImage" className='card-img' src={event.leadImageUrl} alt={event.title} />
                <div className='eventType'>
                  <span id="eventType">{event.eventType} Event</span>
                </div>
                <p id="timing">{event.sessionStartDate} - {event.sessionStartTime}</p>
                <Link id="titleLink" to={`/event/${event.title}`}><h5>{event.title}</h5></Link>
                
              </div>
            ))
         }
         

        </div>

      </main>
    </>
  )
}

export default App
