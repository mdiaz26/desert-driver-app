import React from 'react'
import '../styles.scss'
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';

const Nav = (props) => {
    const isLoggedIn = (!!props.userId)
    
    return (
        // <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Navbar bg="dark" >
            {isLoggedIn ?
                <>
                <Link to={`/users/${props.userId}`} className="btn"><img src={props.avatar} alt="Profile" className="tiny-avatar"/></Link>
                <button onClick={props.signOut} className="btn">Sign Out</button>
                </>
                :
                <>
                <Link to="/login" className="btn">Log In</Link>
                <Link to="/signup" className="btn">Sign Up</Link>
                </>
            } 
            <Link to="/" className="btn">Play!</Link>
            <Link to="/leaderboard" className="btn">Leaderboard</Link>
        </Navbar>
    )
}

export default Nav