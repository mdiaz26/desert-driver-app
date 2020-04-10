import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/">Play!</Link>
            <Link to="/leaderboard">Leaderboard</Link>
        </div>
    )
}

export default Navbar