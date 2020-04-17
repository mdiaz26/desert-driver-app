import React from 'react'
import '../Leaderboard.css'

const ScoreRow = (props) => {
    return (
        <tr id="ranked-row">
            <td className="rank">{props.rank}</td>
            <td className="ranked-player">{props.username.toUpperCase()}</td>
            <td className="ranked-score">{props.points}</td>
            <td className="ranked-distance">{props.max_distance}</td>
        </tr>
    )
}

export default ScoreRow