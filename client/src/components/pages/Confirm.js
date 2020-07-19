import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom';

function Confirm() {
    const {token} = useParams();
     console.log(token);
    const ConfirmEmail = () => {
        
       Axios.get(`/activate/${token}`)
       .then(res => {

          
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
