// Write your code here

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatch extends Component {
  state = {
    isLoading: true,
    matchData: [],
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const fetchedData = await response.json()
    console.log(fetchedData)

    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latest_match_details.id,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        date: fetchedData.latest_match_details.date,
        firstInnings: fetchedData.latest_match_details.first_innings,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        matchStatus: fetchedData.latest_match_details.match_status,
        result: fetchedData.latest_match_details.result,
        secondInnings: fetchedData.latest_match_details.second_innings,
        umpires: fetchedData.latest_match_details.umpires,
        venue: fetchedData.latest_match_details.venue,
      }
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires
        result: recentMatch.result
        manOfTheMatch: recentMatch.man_of_the_match
        id: recentMatch.id
        date: recentMatch.date
        venue: recentMatch.venue
        competingTeam: recentMatch.competing_team
        competingTeamLogo: recentMatch.competing_team_logo
        firstInnings: recentMatch.first_innings
        secondInnings: recentMatch.second_innings
        matchStatus: recentMatch.match_status
      })),
    }
    this.setState({matchData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchData

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchList()}
      </div>
    )
  }

  renderRecentMatchList = () => {
    const {matchData} = this.state
    const {recentMatches} = matchData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchData={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderIsLoading = () => (
    <div testid="loader" className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {isLoading} = this.state
    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? this.renderIsLoading() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatch
