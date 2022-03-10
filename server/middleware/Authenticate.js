const database = require("../model/dataSchema")
const jwt = require("jsonwebtoken");



const Authenticate = async (req, res, next) => {
    console.log(req.headers.authorization, '-------in Auth');


    authToken = req.headers.authorization.split(' ')[1];
    // console.log(authToken)
    try {
        const Token = authToken
        const verifyToken = jwt.verify(Token, process.env.SECRET_KEY);

        const allUsers = await database.find({ role: "user" });
        const rootUser = await database.findOne({ _id: verifyToken._id });
        console.log(rootUser)

        const onedata = [rootUser]
        if (rootUser.role === "admin") {
            req.token = allUsers;
        }
        else if (rootUser.role === "user") {
            req.token = onedata;
        } else {
            req.token = null
        }


        next();

    } catch (err) {
        res.status(401).send(" Unauthorized user ");
    }

}

module.exports = Authenticate;