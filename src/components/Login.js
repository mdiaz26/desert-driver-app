import React from 'react'

class Login extends React.Component {
    
    state = {
        users: [],
        username: "",
        password: "",
        redirectToGame: false
    }
    
    render(){
        return (
            <div>
                Login
            </div>
        )
    }
}

export default Login