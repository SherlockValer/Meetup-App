import { useParams } from "react-router-dom"
import Header from "../components/Header"
import useFetchEventData from "../components/useFetchEventData"
import currencyLogo from '../assets/currency_rupee_Logo.svg'
import timeLogo from '../assets/timeLogo.svg'
import locationLogo from '../assets/locationLogo.svg'
import '../App.css'

const API_URL = import.meta.env.VITE_API_URL

const Event = () => {
    const params = useParams()
    const {data, loading, error} = useFetchEventData(`${API_URL}/events/${params.eventTitle}`)


    return (
        <>
            <Header />
            <main className="container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {
                    data &&
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-6">
                            <h2>{data.title}</h2>
                            <p className="mt-3 mb-0">Hosted By :</p>
                            <p><strong>{data.host}</strong></p>
                            <img className="img-fluid" src={data.leadImageUrl} alt={data.title} />
                            <h5 className="my-3 fw-bold">Details:</h5>
                            <p id="description">{data.description}</p>
                            <h5 className="my-3 fw-bold">Additional Information :</h5>
                            <p><strong>Dress Code :</strong> {data.dressCode}</p>
                            <p><strong>Age Restrictions : </strong>{data.ageRestrictions}</p>
                            <h5 className="my-3 fw-bold">Event Tags :</h5>
                            <p>{data.tags.map(tag => <span className="btn btn-danger btn-sm me-2">{tag}</span>)}</p>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group list-group-flush detailsCard">
                                <li className="list-group-item d-flex align-items-center">
                                    <span><img src={timeLogo} alt="" /></span>
                                    <div className="d-flex flex-column">
                                        <p>{data.sessionStartDate} at {data.sessionStartTime} to</p>
                                        <p>{data.sessionEndDate} at {data.sessionEndTime}</p>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <span><img src={locationLogo} alt="" /></span>
                                    <div className="d-flex flex-column">
                                        <p>{data.venue}</p>
                                        <p>{data.address}</p>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <span><img src={currencyLogo} alt="" /></span>
                                    <div className="d-flex flex-column">
                                        <p>{data.pricing}</p>
                                    </div>

                                </li>
                                
                            </ul>

                            <h4 className="my-3 fw-bold">Speakers : ({data.speakers.length})</h4>
                            <div className="speakerGrid">
                                {
                                    data.speakers.map(speaker => (
                                        <div className="speakerCard d-flex flex-column justify-content-center align-items-center">
                                            <img className="profileImg" src={speaker.profileImageUrl} alt={speaker.name} />
                                            <p className="mt-2 mb-0"><strong>{speaker.name}</strong></p>
                                            <p className="mt-1 mb-0">{speaker.position}</p>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                }

            </main>
        </>
    )
}

export default Event