import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom';

function Confirm() {
    const ConfirmEmail = () => {
        const token = useParams()
       Axios.get(`/activate/${token}`)
       .then(res => {

           console.log(res.token)
       })
    }
    return (
        <div>
            <h1>Confirmation Page</h1>
            <button onClick={ConfirmEmail}>Click</button>
        </div>
    )
}

export default Confirm
