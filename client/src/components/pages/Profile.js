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
      <div className="profile-outer-div">
        
          <img
            className="profile-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsiLJK7jTvBh8VZfehWLIXdlHn7UzlgSbHmw&usqp=CAU"
          />
      
        <div className="profile-name">
          <h3>{user.displayName}</h3>
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
