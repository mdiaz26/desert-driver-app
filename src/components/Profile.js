import React from 'react'
import {Redirect} from 'react-router-dom'

class Profile extends React.Component {
    
    state = {
        user: {
            username: "",
            password: "",
            id: ""
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/users/` + this.props.match.params.id)
        .then(response => response.json())
        .then(user => this.setState({user}))
    }

    findHighScore = () => {
        if (this.props.scores.length && this.state.user.id) {
            const scores = [...this.props.scores]
            let userScores = scores.filter(score => score.user_id === this.state.user.id)
            userScores.sort((scoreA, scoreB) =>scoreB.points -  scoreA.points)
            return userScores[0].points
        }
    }

    render(){
        if (this.props.userId === "") {
            return <Redirect to="/"/>
        }
        return(
            <div>
                <h1>Profile</h1>
                <button onClick={() => console.log(this.state)}>See State</button>
                <p>Username: {this.state.user.username}</p>
                <p>High Score: {this.findHighScore()}</p>
    
            </div>
        )
    }
}

export default Profile