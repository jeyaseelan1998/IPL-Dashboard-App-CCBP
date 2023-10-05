import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])

  const getTeamsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/ipl'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))

    setTeamsData(updatedData)
    setIsLoading(false)
  }

  useEffect(() => {
    getTeamsData()
  }, [])

  const renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader m-auto">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
    </div>
  )

  const renderSuccessView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1>IPL Dashboard</h1>
      </div>

      <ul className="ps-0">
        {teamsData.map(team => (
          <li key={team.id}>
            <img src={team.teamImageUrl} alt={team.name} />
            <p>{team.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="home-bg-container d-flex">
      {!isLoading ? renderLoader() : renderSuccessView()}
    </div>
  )
}

export default Home
