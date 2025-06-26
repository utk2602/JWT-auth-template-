import { Response } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = "secrethai"
const JWT_EXPIRY =  "1h"

const generateJWT=(res:Response,userId:String)=>{
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    const expiryInSeconds = parseInt(JWT_EXPIRY as string);
    if (isNaN(expiryInSeconds)) {
        throw new Error("Invalid JWT_EXPIRY value")
    }

    res.cookie("jwt",token,{
        httpOnly:true,
        secure: true,
        sameSite:"strict",
        maxAge:expiryInSeconds*1000,
        path:"/",
    })
}
const clearJWT=(res:Response)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        expires:new Date(0),
        path:"/",
    })
}

export{ generateJWT,clearJWT}