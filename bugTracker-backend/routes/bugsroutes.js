import express from "express"
import {getbugs,addbugs,deletebugs,editbugs,deletesol} from "../controllers/bugControllers.js"
import authmid from "../auth/middelware.js"

const router=express.Router();

router.get("/",getbugs)
router.post("/",authmid,addbugs)
router.put("/:id",authmid,editbugs)
router.delete("/:id",authmid,deletebugs)
router.delete("/:id/sol/:solid",authmid,deletesol)




export default router;

