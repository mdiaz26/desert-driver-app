import React from 'react'
import {Redirect} from 'react-router-dom'
import '../Login.css'

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
            <div className="login-screen">
                <div className="login-form">
                    <p className="login">Login</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input className="input-field" type="text" placeholder="USERNAME" value={this.state.username} name="username" onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>
                            <input className="input-field" type="password" placeholder="PASSWORD" value={this.state.password} name="password" onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <input className="submit-button" type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login