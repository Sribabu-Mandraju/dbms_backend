import express from 'express'
import {register,login} from '../controllers/student.controller.js'

// import { login,setExternalSetNumber,setInternalSetNumber,setVivaSetNumbers } from "../controllers/student.controller.js";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
export default router
