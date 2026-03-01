import express from "express"
import {getusers,logoutusers,registerusers,loginusers,protectedroute} from "../controllers/userControllers.js"
import authmid from "../auth/middelware.js"

const userrouter=express.Router();

userrouter.get("/",getusers)
userrouter.get("/logout",logoutusers)
userrouter.post("/register",registerusers)
userrouter.post("/login",loginusers)
userrouter.get("/protected",authmid,protectedroute)



export default userrouter;