import React,{useEffect} from 'react'
import Axios from 'axios'
import M from "materialize-css";
import { notify } from "react-notify-toast";
import { useParams, useHistory } from 'react-router-dom';

function Confirm() {
    const history = useHistory()
    const { token } = useParams(); 
    useEffect(() => {
       fetch(`/users/test`
    //     headers: {
    //      // "Content-Type": "application/json",
    //       "Accept": "application/json",
    //     },
    //   })
    ).then((res) => res.json())
        .then((data) => {
            console.log(data)
          if (data.error) {
              console.log(data.error);
            // M.toast({
            //   html: data.error,
            //   classes: "#c62828 red darken-3",
            // });
          } else {
              console.log(data.message);
            // M.toast({
            //   html: data.message,
            //   classes: "#2e7d32 green darken-3",
            // });
            history.push("/login");
          }
        })
        .catch((err) => console.log(err))
    }, []);
        
    return (
        <div>
            <h5 className="text-center">Confirmation Page</h5>          
        </div>
    )
}

export default Confirm
