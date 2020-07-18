import React, { useEffect, useState, useContext } from "react";
import {Tooltip, Icon } from 'antd'
import UserContext from "../context/Context";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/posts/allPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("usertoken"),
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response.posts);       
      })
      .catch(err => {
        console.log(err)
      })
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
              <Tooltip title="Like">
                {/* <Icon type="like"
                      theme="filled"
                      /> */}
              </Tooltip>
              {/* <i className="icons far fa-thumbs-up"></i>
              <i className="icons far fa-thumbs-down"></i> */}
              <p>{item.likes.length} Likes</p>
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
