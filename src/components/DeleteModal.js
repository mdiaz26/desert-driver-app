import React from 'react'

const DeleteModal = (props) => {
    return (
        <div>
            <p>Are you sure?</p>
            <button onClick={props.deleteAccount}>Delete</button>
            <button onClick={props.toggleModal}>Cancel</button>
        </div>
    )
}

export default DeleteModal