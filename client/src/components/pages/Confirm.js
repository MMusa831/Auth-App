import React, { useEffect } from "react";
import Axios from "axios";
import M from "materialize-css";
import { notify } from "react-notify-toast";
import { useParams, useHistory } from "react-router-dom";

function Confirm() {
  const history = useHistory();
  const { token } = useParams();
 
  
  useEffect(() => {
    // getResponse();
    console.log(token);
    fetch(`/users/activate/${token}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        M.toast({
          html: data.error,
          classes: "#c62828 red darken-3",
        });
      } else {
       M.toast({
         html: "you logged in successfully",
         classes: "#2e7d32 green darken-3",
       });
           history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h5 className="text-center">Confirmation Page</h5>
    </div>
  );
}

export default Confirm;
