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

  const AddComment = (text, postId) => {
    fetch("/posts/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usertoken"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {        
        console.log(result);
        const newData = data.map(item => {
          if(item._id === result._id) {
            return result;
          }else {
            return item;
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      });
  }

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
                Created By: {item.postedBy.displayName}
                <br />
                at: {new Date(item.date).toDateString()}
              </p>
              {
                item.comments.map(comment => {
                  return (
                    <h6 key={item._id}><span style={{fontWeight: "600"}}>{comment.postedBy.displayName}</span>{comment.text}</h6>
                  )
                })
              }
              <form onSubmit={(e) =>{
                e.preventDefault()
                AddComment(e.target[0].value, item._id)
              }}>
                <input
                  id="standard-basic"
                  className="input"
                  placeholder="Add comment"
                />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
