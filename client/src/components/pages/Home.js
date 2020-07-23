import React, { useEffect, useState } from "react";
import Axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/posts/allPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("usertoken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result);
      });
  }, []);

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card" key={item._id}>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <h6 className="post-title">{item.title}</h6>
              <p>{item.body}</p>
              <p className="posted-by">
                Created By: {item.postedBy.displayName}<br></br>
                 at: {new Date(item.date).toDateString()}
              </p>

              <input
                id="standard-basic"
                className="input"
                placeholder="Add comment"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
