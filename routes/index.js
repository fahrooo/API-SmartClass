import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  putUsers,
  deleteUsers,
} from "../controller/Users.js";

import { getUnits } from "../controller/Unit.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.post("/users", verifyToken, getUsers);
router.post("/users/update", verifyToken, putUsers);
router.delete("/users/delete/:id", verifyToken, deleteUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.post("/units", verifyToken, getUnits);

export default router;
