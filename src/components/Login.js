import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={this.state.username} name="username" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                    <Button variant="primary" type="submit" className="text-dark">
                        Submit
                    </Button>
                    </Form.Group>
                </form>
            </div>
        )
    }
}

export default Login