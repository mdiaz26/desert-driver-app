import React from 'react'
import {Redirect} from 'react-router-dom'
import JSONAPIAdapter from '../JSONAPIAdapter'
import AvatarChoice from './AvatarChoice'

class SignUp extends React.Component {
    
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        selectedAvatar: "Cain Firstman",
        redirectToGame: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createUser = () => {
        const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
        adapter.post('users', {
            user: {
                username: this.state.username, 
                password: this.state.password, 
                avatar_id: this.getAvatarId(this.state.selectedAvatar)
            }
        })
        .then(this.props.appendNewUser)
        .then(this.props.setUser)
    }

    removeSpaces = string => {
        return string.replace(/\s+/g, '')
    }

    getAvatarId = name => {
        let avatarObj = this.props.avatars.find(avatar => avatar.name === name)
        return avatarObj.id
    }

    isChecked = name => {
        return this.state.selectedAvatar === name
    }

    handleRadioChange = event => {
        this.setState({selectedAvatar: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.password !== this.state.confirmPassword) {
            alert("Password and confirm password do not match. Please try again")
            this.setState({
                password: "",
                confirmPassword: ""
            })
        } else if (this.props.users.filter(user => user.username === this.state.username).length > 0) {
            alert("This user already exists. Try changing your username or logging in")
            this.setState({
                password: "",
                confirmPassword: ""
            })
        } else if (!this.removeSpaces(this.state.username) || !this.removeSpaces(this.state.password) || !this.removeSpaces(this.state.confirmPassword)){
            alert("no blank spaces please")
            this.setState({
                password: "",
                confirmPassword: ""
            })
        } else {
            this.createUser()
            this.setState({
                username: "",
                password: "",
                confirmPassword: "",
                redirectToGame: true
            })
        }
    }

    render(){
        const redirectToGame = this.state.redirectToGame
        if (redirectToGame) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1>Sign Up Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} name="username" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Confirm Password:
                        <input type="password" value={this.state.confirmPassword} name="confirmPassword" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Choose Avatar:
                        {this.props.avatars.map(avatar => 
                            <AvatarChoice 
                                key={avatar.id} 
                                {...avatar} 
                                isChecked={this.isChecked}
                                handleRadioChange={this.handleRadioChange}
                            />)}
                    </label>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

export default SignUp