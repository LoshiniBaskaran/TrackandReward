const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) {
        return res.json({ error: "User not logged in"});
    }

    try {
        const validToken = verify(accessToken, "secretkey123");

        if(validToken) {
            /* req.body.empId = validToken.empId;
            req.body.contributedBy = validToken.empId;
            req.body.subBy = validToken.empId;
            req.body.reviewedBy = validToken.empId;*/
            req.employee = validToken;

            return next();
        }

    } catch (error) {
        return res.json({ error : error});
    }
};

module.exports = {validateToken};