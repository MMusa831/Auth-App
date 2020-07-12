const jwt = require('jsonwebtoken');

const auth = ( req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res
                .status(401)
                .json({ msg: "No athentication token, access denied" });
        const verified = jwt.verify(token, process.env.JWT_SECURE_KEY);
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verefication failed, access denied" }); 
         req.user = verified.id;   
         next();    
    } catch (err) {
        res.status(500).json({ error: err.message })
    }    
}
module.exports = auth;