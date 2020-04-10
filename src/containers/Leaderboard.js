import React from 'react'
import ScoreRow from '../components/ScoreRow'

const Leaderboard = (props) => {
    
    const orderedScores = [...props.scores].sort((scoreA, scoreB) => scoreB.points - scoreA.points)
    
    return (
        <div>
            <h1>Leaderboard</h1>
            <button onClick={() => console.log(props)}>See my props</button>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Distance</th>
                        <th>Player</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedScores.map((score, index) => <ScoreRow key={score.id} rank={index + 1} {...score}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard