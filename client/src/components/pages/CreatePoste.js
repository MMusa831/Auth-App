import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch("/posts/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usertoken"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
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
              html: "Post created successfully",
              classes: "#2e7d32 green darken-3",
            });
            history.push("/");
          }
        });
    }
  }, [url]);

  const addPost = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "blogPost");
    data.append("cloud_name", "daitevpn7");
    fetch("https://api.cloudinary.com/v1_1/daitevpn7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((error) => {       
          M.toast({
            html:" error.message",
            classes: "#c62828 red darken-3",
          });        
      });
  };

  return (
    <div className="post-div input-field">
      <div>
        <h3 className="post-head">Create your own Post</h3>
        <input
          className="input"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          className="input"
          placeholder="Body"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <input type="submit" id="btn" value="Submit" onClick={() => addPost()} />
    </div>
  );
};
export default CreatePost;
