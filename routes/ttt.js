const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth')

// Register Route
router.post('/create', async (req, res) => {
    try {
        let { email, displayName, password, confirmPassword } = req.body;

        // validate
        if (!email || !password || !confirmPassword)
            return res.status(400).json({ msg: 'Please fill all the fields!' })
        if (password.length < 6)
            return res.status(400).json({ msg: 'Pasword must be at least 6 character long!' })
        if (password !== confirmPassword)
            return res.status(400).json({ msg: 'Your password and confirmation password are not match!' });
        const exist_user = await User.findOne({ email: email })
        if (exist_user)
            return res.status(400).json({ msg: 'A user with this email already exist!' });
        if (!displayName) displayName = email;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const new_user = new User({
            email,
            password: hashedPassword,
            displayName
        });
        const saved_user = await new_user.save();
        res.json(saved_user);
    } catch (err) {
        console.log(err)
    }
});
// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: 'Please fill all the fields!' })
        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(400).json({ msg: 'user with this email does not exist!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid email or password!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECURE_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});
// Delete User
router.delete('/delete', auth, async (req, res) => {
    try {
        const deleted_user = await User.findByIdAndDelete(req.user);
        res.json(deleted_user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});
// Verefied token
router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECURE_KEY);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id)
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get User route
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        email: user.email,
        id: user._id
    });
})

module.exports = router;
//  const token = jwt.sign(
//       { displayName, email, password },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "20m" }
//     );
    // Sending Email


    // let transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: process.env.AUTH_EMAIL, // generated ethereal user
    //     pass: process.env.AUTH_PASSWORD, // generated ethereal password
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
    // const URL = `http://localhost:8080/users/activate/${token}`;

    // let mailOptions = {
    //   from: '"Portfolio contact" <myapp.test121@gmail.com>', // sender address
    //   to: req.body.email, // list of receivers
    //   subject: "Accoun activate link", // Subject line
    //   html: `
    //   <h2>Pleast click on the link to activate your account</h2>
    //   <a href="http://${req.headers.host}/users/activate/${token}">${req.headers.host}/${token}</a>`, // html body
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return res.json({
    //       error: err.message,
    //     });
    //   }
      return res.json({
        message: "Email has been sent, please activate your account",
      });
    // })
const { authorization } = req.headers;
if (!authorization) return res.json(false);
const token = await authorization.replace("Bearer ", "");
if (!token) return res.json(false);

const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
if (!verified) return res.json(false);

req.user = await User.findById(verified.id);

next();   


router.post("/reset-password/:token", (req, res) => {
  const resetPasswordToken = req.params.token;
  const { newPassword, confirmNewPassword } = req.body;
  if (newPassword.length < 6)
    return res
      .status(400)
      .json({ error: "Pasword must be at least 6 character long!" });
  if (newPassword !== confirmNewPassword)
    return res.status(400).json({
      error: "Your password and confirmation password are not match!",
    });
  if (resetPasswordToken) {
    jwt.verify(
      resetPasswordToken,
      process.env.RESET_PASS_KEY,
      (err, decodedToken) => {
        if (err) {
          return res.status(400).json({ error: "invalid token or expired!!" });
        }

        User.findOne({ resetPasswordToken }, (err, user) => {
          if (err || !user) {
            res
              .status(400)
              .json({ error: "User with this token does not exist!" });
          }
          const salt = bcrypt.genSalt();
          const hashedPassword = bcrypt.hash(newPassword, salt);
          const obj = {
            password: newPassword,
            resetPasswordToken: "",
          };
          user = _.extend(user, obj);
          console.log(user);
          user.save((err, message) => {
            if (err) {
              return res.status(400).json({
                error: "Error while changing password",
              });
            }
            res.json({
              message: "Your password has been changed successfully!!",
            });
          });
        });
      }
    );
  } else {
    return res.json({ error: "Something went wrong" });
  }
});