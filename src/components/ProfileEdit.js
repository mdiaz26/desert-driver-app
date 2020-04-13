import React from 'react'

const ProfileEdit = (props) => {
    return(
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={props.user.username} onChange={props.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <button onClick={props.deleteAccount}>Delete Account</button>
        </div>
    )
}

export default ProfileEdit