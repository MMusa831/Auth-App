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
       fetch(`/users/test`

    )
    .then(res => res.json())
    .then(data => {           
          if (data.error) {
            console.log(data.error);
          } else {
              console.log(data.message);
           // history.push("/login");
          }
        })
        .catch((err) => console.log(err))
  }, []);

  return (
    <div>
      <h5 className="text-center">Confirmation Page</h5>
    </div>
  );
}

export default Confirm;
