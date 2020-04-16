import React from 'react'

const ScoreRow = (props) => {
    return (
        <tr>
            <td>{props.rank}</td>
            <td>{props.points}</td>
            <td>{props.max_distance}</td>
            <td>{props.username}</td>
        </tr>
    )
}

export default ScoreRow