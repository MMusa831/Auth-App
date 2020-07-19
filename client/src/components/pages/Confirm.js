import React,{useEffect} from 'react'
import Axios from 'axios'
import M from "materialize-css";
import { notify } from "react-notify-toast";
import { useParams, useHistory } from 'react-router-dom';

function Confirm() {
    const history = useHistory()
    const { token } = useParams();
  //  console.log(token);
    useEffect(() => {
      fetch(`/users/activate/${token}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
          } else {
            M.toast({
              html: data.message,
              classes: "#2e7d32 green darken-3",
            });
          }
        })
        .catch((err) => console.log(err));
    }, []);
    // const token = useParams();
    // const Token = token.token
    //  console.log(Token);
    // const ConfirmEmail = (token) => {
        
    //    Axios.get(`/users/activate/${Token}`).then((data) => {
    //      if (data.error) {
    //        console.log(data.error);
    //      } else {
    //          console.log(data.success);
    //        history.push("/login");
    //      }
    //    });
    // }
    
    return (
        <div>
            <h1>Confirmation Page</h1>
            {/* <button onClick={ConfirmEmail}>Click</button> */}
        </div>
    )
}

export default Confirm
