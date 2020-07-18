const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

module.exports =  (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.json({error:"You must be logged in"});
    const token =  authorization.replace("Bearer ", "");
    if (!token) return res.json({error:"You must be logged in"});

   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) =>{
       if (err) return res.json({ error: "You must be logged in" });

       User.findById(payload.id).then(result => {
           req.user = result
           next();
       })
   });
    

};
