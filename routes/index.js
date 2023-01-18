import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  putUsers,
  deleteUsers,
  verifyEmail,
  sendVerifyEmail,
  checkVerifyEmail,
} from "../controller/Users.js";

import { getUnits } from "../controller/Unit.js";

import { getKelas } from "../controller/Kelas.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { relayGet, relayPost } from "../controller/Perangkat.js";

const router = express.Router();

//Authitentication
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.get("/:nik/verifyemail/:token", verifyEmail);
router.post("/sendverifyemail", sendVerifyEmail);
router.post("/checkverifyemail", checkVerifyEmail);

//CRUD Users
router.post("/users", verifyToken, getUsers);
router.post("/users/update", verifyToken, putUsers);
router.delete("/users/delete/:id", verifyToken, deleteUsers);

//CRUD Units
router.post("/units", verifyToken, getUnits);

//CRUD Kelas
router.post("/kelas", verifyToken, getUnits);

//MQTT Perangkat
router.post("/relaypost", relayPost);
router.post("/relayget", relayGet);

export default router;
