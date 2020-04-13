import React, {useState} from 'react'
import DeleteModal from './DeleteModal'

const ProfileEdit = (props) => {
    const [modalState, changeModalState] = useState({display: false})
    const [passwordState, changePasswordState] = useState({display: false})

    const toggleModal = () => {
        changeModalState({display: !modalState.display})
    }

    const togglePassword = (event) => {
        event.preventDefault()
        changePasswordState({display: !passwordState.display})
    }

    return(
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={props.user.username} onChange={props.handleChange}/>
                </label>
                <label>
                    Password:
                    {passwordState.display ? 
                        <input type="text" name="password" value={props.user.password} onChange={props.handleChange}/>
                        :
                        <input type="password" name="password" value={props.user.password} onChange={props.handleChange}/>
                    }
                    <button onClick={togglePassword}>Show Password</button>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <button onClick={toggleModal}>Delete Account</button>
            {modalState.display && 
                <DeleteModal 
                    toggleModal={toggleModal} 
                    deleteAccount={props.deleteAccount}
                />}
        </div>
    )
}

export default ProfileEdit