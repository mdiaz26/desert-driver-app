import React from 'react'

const ProfileEdit = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={props.user.username} onChange={props.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default ProfileEdit