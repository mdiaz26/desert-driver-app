import React from 'react'

class Profile extends React.Component {
    
    state = {
        user: {
            username: "",
            password: "",
            id: ""
        }
    }

    findHighScore = () => {
        if (this.props.scores.length && this.state.user.id) {
            const scores = [...this.props.scores]
            let userScores = scores.filter(score => score.user_id === this.state.user.id)
            userScores.sort((scoreA, scoreB) =>scoreB.points -  scoreA.points)
            // debugger
            return userScores[0].points
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/users/` + this.props.match.params.id)
        //the user id (currently "1"), will be a variable that is dependent on either (or both)
        // the URL (ie users/1) or props. I have to look it up
        .then(response => response.json())
        .then(user => this.setState({user}))
    }

    render(){
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