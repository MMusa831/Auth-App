import React from 'react'
import Axios from 'axios'
import M from "materialize-css";
import { useParams, useHistory } from 'react-router-dom';

function Confirm() {
    const history = useHistory()
    const token = useParams();
    const Token = token.token
     console.log(Token);
    const ConfirmEmail = (token) => {
        
       Axios.get(`/activate/${Token}`).then((data) => {
         if (data.error) {
           console.log(data.error);
         } else {
             console.log(data.success);
           history.push("/login");
         }
       });
    }
    
    return (
        <div>
            <h1>Confirmation Page</h1>
            <button onClick={ConfirmEmail}>Click</button>
        </div>
    )
}

export default Confirm
