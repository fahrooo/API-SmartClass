import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  deleteUsers,
  verifyEmail,
  sendVerifyEmail,
  checkVerifyEmail,
  updateEmail,
  updatePassword,
  postUsers,
  putUsers,
} from "../controller/Users.js";
import { relayGet, relayPost } from "../controller/Perangkat.js";
import {
  deleteUnits,
  getUnits,
  postUnits,
  putUnits,
} from "../controller/Units.js";
import {
  deleteKelas,
  getKelas,
  postKelas,
  putKelas,
} from "../controller/Kelas.js";
import { getOperator, postOperator } from "../controller/operatorKelas.js";
import {} from "../controller/datastream.js";
import {} from "../controller/perangkatKelas.js";
import {} from "../controller/waktu.js";
import {} from "../controller/booking";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

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
router.post("/updatepassword", updatePassword);

//CRUD Users
router.post("/users", getUsers);
router.post("/users/create", postUsers);
router.put("/users/update/:id", putUsers);
router.delete("/users/delete/:id", deleteUsers);

//CRUD Units
router.get("/units", getUnits);
router.post("/units/create", postUnits);
router.put("/units/update/:id", putUnits);
router.delete("/units/delete/:id", deleteUnits);

//CRUD Kelas
router.post("/kelas", getKelas);
router.post("/kelas/create", postKelas);
router.put("/kelas/update/:id", putKelas);
router.delete("/kelas/delete/:id", deleteKelas);

//CRUD Operator
router.post("/operator", getOperator);
router.post("/operator/create", postOperator);
router.put("/operator/update/:id", putKelas);
router.delete("/operator/delete/:id", deleteKelas);

//MQTT Perangkat
router.post("/relaypost", relayPost);
router.post("/relayget", relayGet);

export default router;
