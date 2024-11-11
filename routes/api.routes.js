import express from 'express'
import {register,login,getVivaResponses,createOrUpdateVivaResponse} from '../controllers/student.controller.js'

// import { login,setExternalSetNumber,setInternalSetNumber,setVivaSetNumbers } from "../controllers/student.controller.js";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/submit-viva",createOrUpdateVivaResponse)
router.get("/response/:studentId")
export default router
