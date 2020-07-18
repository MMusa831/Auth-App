import React, { useEffect, useState, useContext } from "react";
import { Tooltip, Icon } from "antd";
import UserContext from "../context/Context";
import Axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPost();
    // Axios.get("/posts/allPosts", {
    //   headers: { Authorization: "Bearer " + localStorage.getItem("usertoken") },
    // }).then((result) => {
    //     setData(JSON.parse(result.posts));
    //     console.log(data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // fetch("/posts/allPosts", {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("usertoken"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setData(result.posts);
    //     console.log(result);
    //   });
  }, []);
  const fetchPost = () => {
    fetch("/posts/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("usertoken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card" key={item._id}>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <i className="icons far fa-thumbs-up"></i>
              <i className="icons far fa-thumbs-down"></i>             
              <h6 className="post-title">{item.title}</h6>
              <p>{item.body}</p>
              <p className="posted-by">
                Created By :{item.postedBy.displayName}
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
