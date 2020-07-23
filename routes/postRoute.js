const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

// Create  a Post

router.post("/create", auth, async (req, res) => {
  try {
    const { title, body, photo } = req.body;
     if (!photo) {
       return res.status(422).json({ error: "Please upload photo!" });
     }
    if (!title || !body || !photo) {
      return res.status(422).json({ error: "Please fill all fields!" });
    }
    const new_post = new Post({
      title,
      body,
      photo,     
      postedBy: req.user,
      });
    const saved_post = await new_post.save();
    res.json(saved_post);
  } catch (err) {
    console.log(err);
  }
});
// Get all the Posts
router.get("/allPosts", auth, (req, res) => {
  Post.find()
    .populate("postedBy", "_id displayName")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
//Get post for user singed in
router.get("/myPosts", auth, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "id displayName")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Like route
// router.put('/like',auth, (req, res) => {
//   Post.findByIdAndUpdate(req.body.postId, {
//     $push: { likes: req.user._id }
//     }, {
//       new: true
//     }).exec((err, result) =>{
//      if(err){
//       return res.status(422).json({error:err })
//      }else{
//         res.json(result)
//      }
//     })
// })

// // Dislike route
// router.put('/dislike', auth, (req, res) => {
//   Post.findByIdAndUpdate(req.body.postId, {
//     $pull: { likes: req.user._id }
//   }, {
//     new: true
//   }).exec((err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err })
//     } else {
//       res.json(result)
//     }
//   })
// })
module.exports = router;
