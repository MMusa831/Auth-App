import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/Context";

const Profile = () => {
  const [posts, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = () => {
    fetch("/posts/myPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("usertoken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPost(result.myposts);
      });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0px",
          paddingBottom: "20px",
          borderBottom: "1px solid #636e72",
        }}
      >
        <div>
          <img
            style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsiLJK7jTvBh8VZfehWLIXdlHn7UzlgSbHmw&usqp=CAU"
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3>{user.displayName}</h3>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {posts.map((item) => {
          return (
            <img
              key={item._id}
              className="items"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
