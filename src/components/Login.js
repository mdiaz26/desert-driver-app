import React from 'react'
import {Redirect} from 'react-router-dom'

class Login extends React.Component {
    
    state = {
        username: "",
        password: "",
        redirectToGame: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    findUser = username => {
        return this.props.users.find(user => user.username === username)
    }

    handleSubmit = event => {
        event.preventDefault()
        const userObj = this.findUser(this.state.username)
        if (userObj) {
            if (this.state.password === userObj.password) {
                this.props.setUser(userObj) 
                this.setState({redirectToGame: true})
            } else if (this.state.password !== userObj.password) {
                alert("incorrect password")
                this.setState({password: ""})
            }
        } else {
            alert("that username has not been found in our database. Try signing up for a new account!")
            this.setState({username: "", password: ""})
        }
    }
    
    render(){
        const redirectToGame = this.state.redirectToGame
        if (redirectToGame) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1>Login Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} name="username" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

export default Login