import React from 'react'
import Axios from 'axios'
import M from "materialize-css";
import { useParams, useHistory } from 'react-router-dom';

function Confirm() {
    const history = useHistory()
    const {token} = useParams();
     console.log(token);
    const ConfirmEmail = ({token}) => {
        
       Axios.get(`/activate/${{token}}`)
       .then((res) => {
           if (res.error) {
          M.toast({
            html: res.error,
            classes: "#c62828 red darken-3",
          });
        }else{
             M.toast({
               html: res.success,
               classes: "#c62828 red darken-3",
             });
        }
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
