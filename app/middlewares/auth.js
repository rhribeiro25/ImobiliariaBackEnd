const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth")

module.exports = (res, req, next) => {
    const aithHeader = req.headers.authorization;

    if(!authorization)
        return res.status(401).send({ error: "No token provided!" });
        
    const parts = authorization.split(" ");

    if(!parts.length === 2)
        return res.status(401).send({ error: "Token Error!"});

    const [ scheme, token ] = parts;

    if(!/^Bearer$^/i.test(scheme))
        res.status(401).send({ error: "Token malformatted!"});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: "Token invalid"});

        req.userId = decoded.id;
        return next();
    });
};