import React from 'react'
import Axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';

function Confirm() {
    const history = useHistory()
    const {token} = useParams();
     console.log(token);
    const ConfirmEmail = (token) => {
        
       Axios.get(`/activate/${token}`)
       .then(() => {
         return history.push('/login')
          
       })
    }
    // export const attemptGetConfirmation = (token) => (dispatch) =>
    //   getConfirmation(token).then(() => {
    //     return dispatch(push("/login"));
    //   });
    return (
        <div>
            <h1>Confirmation Page</h1>
            <button onClick={ConfirmEmail}>Click</button>
        </div>
    )
}

export default Confirm
