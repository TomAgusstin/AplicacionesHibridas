import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const validacionToken = (req, res, next) =>{
    console.log('Middleware...');

    const jwt = req.headers.authorization;

    if(!jwt)
    {
        res.status(401).json({msg: "Error. Falta el token."});
    }
    const token = jwt.split(' ')[1];

    jsonwebtoken.verify(token, secretKey, (err, decoded) =>{
        if(err)
        {
            res.status(403).json({msg: "Token invalido."});
        }
        // req.body.userId = decoded.id;
    });
    next();
}