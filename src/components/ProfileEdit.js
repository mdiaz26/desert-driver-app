import React from 'react'
import DeleteModal from './DeleteModal'

class ProfileEdit extends React.Component {
    
    state = {
        modalDisplay: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modalDisplay: !prevState.modalDisplay
        }))
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={this.props.user.username} onChange={this.props.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <button onClick={this.toggleModal}>Delete Account</button>
                {this.state.modalDisplay && 
                    <DeleteModal 
                        toggleModal={this.toggleModal} 
                        deleteAccount={this.props.deleteAccount}
                    />}
            </div>
        )
    }
}

export default ProfileEdit