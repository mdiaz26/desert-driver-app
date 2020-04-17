import React from 'react'
import ScoreRow from '../components/ScoreRow'
import '../Leaderboard.css'

const Leaderboard = (props) => {
    
    const orderedScores = [...props.scores].sort((scoreA, scoreB) => scoreB.points - scoreA.points)
    const topTen = orderedScores.slice(0, 10)
    
    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-heading">LEADERS</h1>
            {/* <button onClick={() => console.log(props)}>See my props</button> */}
            <table className="table">
                <thead className="table-head">
                    <tr >
                        <th >Rank</th>
                        <th>Player</th>
                        <th >Score</th>
                        <th >Max Distance</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {topTen.map((score, index) => <ScoreRow key={score.id} rank={index + 1} {...score}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard