import React from 'react'

export default function HandleError(props) {
    return (
        <div className="error-alert">
            <span>{props.message}</span>  
            <button onClick={props.clearError}>x</button>          
        </div>
    )
}
