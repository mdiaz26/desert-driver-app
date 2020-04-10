import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = (props) => {
    const isLoggedIn = (!!props.userId)
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {isLoggedIn ?
                <>
                <Link to={`/users/${props.userId}`}>Profile</Link>
                <button onClick={props.signOut}>Sign Out</button>
                </>
                :
                <>
                <Link to={'/'}>Profile</Link>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
                </>
            } 
            <Link to="/">Play!</Link>
            <Link to="/leaderboard">Leaderboard</Link>
        </div>
    )
}

export default Navbar