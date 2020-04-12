import React from 'react'

const ScoreRow = (props) => {
    // const scoreUser = props.users.find(user => user.id === props.user.id)
    return (
        <tr>
            <td>{props.rank}</td>
            <td>{props.points}</td>
            <td>{props.distance}</td>
            <td>{props.user.username}</td>
        </tr>
    )
}

export default ScoreRow