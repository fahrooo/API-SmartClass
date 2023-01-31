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
  updateEmail,
} from "../controller/Users.js";

import { getUnits, postUnits } from "../controller/Unit.js";

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
router.post("/verifyemail", verifyEmail);
router.post("/sendverifyemail", sendVerifyEmail);
router.post("/checkverifyemail", checkVerifyEmail);
router.post("/updateemailverify", updateEmail);

//CRUD Users
router.post("/users", verifyToken, getUsers);
router.post("/users/update", verifyToken, putUsers);
router.delete("/users/delete/:id", verifyToken, deleteUsers);

//CRUD Units
router.get("/units", getUnits);
router.post("/units/create", postUnits);

//CRUD Kelas
router.post("/kelas", verifyToken, getUnits);

//MQTT Perangkat
router.post("/relaypost", relayPost);
router.post("/relayget", relayGet);

export default router;
