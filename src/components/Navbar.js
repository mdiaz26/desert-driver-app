import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link to={`/users/${props.userId}`}>Profile</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/">Play!</Link>
            <Link to="/leaderboard">Leaderboard</Link>
        </div>
    )
}

export default Navbar