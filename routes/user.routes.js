import express, { request, response } from "express";
import { saveUser, signIn,Update,Delete} from "../controller/user.controller.js";
import { body } from "express-validator";
const router = express.Router();

// http://localhost:3000/user/save
router.post("/save",
body("username","username is required").notEmpty(),
body("email","email id is not correct").isEmail(),
body("email","email id is required").notEmpty(),
body("password","password is required").notEmpty(),
body("password","password must contain at least 4 letter").isLength({min: 4}),saveUser);

router.post("/signin",signIn);
//put-//http://localhost:3000/user/Update
router.put("/Update/:id",Update);
router.delete("/Delete/:id",Delete);

//========================================

export default router;