// Write your code here
import './index.css'
import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {matchData} = this.props
    const {result, competingTeam, competingTeamLogo, matchStatus} = matchData
    return (
      //   <div className="match-card-container">
      <li className={`match-card ${matchStatus}`}>
        <img
          className="match-card-logo"
          src={competingTeamLogo}
          alt="competing team {competing_team}"
        />
        <h1 className="match-card-name">{competingTeam}</h1>
        <p className="match-card-result">{result}</p>
        <p className="match-status">{matchStatus}</p>
      </li>
      //   </div>
    )
  }
}

export default MatchCard
