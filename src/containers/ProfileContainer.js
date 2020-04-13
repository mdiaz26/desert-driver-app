import React from 'react'
import JSONAPIAdapter from '../JSONAPIAdapter'
import {Redirect} from 'react-router-dom'
import Profile from '../components/Profile'
import ProfileEdit from '../components/ProfileEdit'

class ProfileContainer extends React.Component {
    
    state = {
        user: {
            username: "",
            password: "",
            id: ""
        },
        editMode: false
    }

    componentDidMount(){
        const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
        adapter.getOne('users', this.props.match.params.id)
        .then(user => this.setState({user}))
    }

    findHighScore = () => {
        if (this.props.scores.length && this.state.user.id) {
            const scores = [...this.props.scores]
            let userScores = scores.filter(score => score.user_number === this.state.user.id)
            console.log(userScores)
            if (userScores.length > 0) {
                userScores.sort((scoreA, scoreB) =>scoreB.points -  scoreA.points)
                return userScores[0].points
            } else if (userScores.length === 0 ) {
                return "no scores yet"
            }
        }
    }

    toggleEdit = () => {
        this.setState((prevState) => ({editMode: !prevState.editMode}))
    }

    handleChange = (event) => {
        event.persist()
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }), console.log(this.state))
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.updateAPI()
        this.toggleEdit()
    }

    updateAPI = () => {
        console.log(this.state)
        const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
        adapter.update("users", this.state.user.id, this.state.user)
        .then(this.props.appendUpdatedUser)
    }

    render(){
        if (this.props.userId === "") {
            return <Redirect to="/"/>
        }
        return(
            <div>
                <button onClick={() => console.log(this.state)}>See State</button>
                <h1>Profile</h1>
                {this.state.editMode ? 
                    <>
                        <button onClick={this.toggleEdit}>Cancel</button>
                        <ProfileEdit
                            user={this.state.user}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </>
                    :
                    <>
                        <button onClick={this.toggleEdit}>Edit</button>
                        <Profile
                            user={this.state.user}
                            findHighScore={this.findHighScore}
                        />
                    </>
            }
            </div>
        )
    }
}

export default ProfileContainer