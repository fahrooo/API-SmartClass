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
  Me,
  getUsersbyId,
  resetPassword,
} from "../controller/Users.js";
import {
  deleteUnits,
  getUnits,
  getUnitsAll,
  getUnitsbyId,
  postUnits,
  putUnits,
} from "../controller/Units.js";
import {
  deleteKelas,
  getKelas,
  getKelasbyId,
  postKelas,
  putKelas,
} from "../controller/Kelas.js";
import {
  deleteOperator,
  getOperator,
  getOperatorbyId,
  postOperator,
  putOperator,
} from "../controller/operatorKelas.js";
import {
  deleteDatastream,
  getDatastream,
  postDatastream,
  putDatastream,
} from "../controller/datastream.js";
import {
  deletePerangkatKelas,
  getPerangkatKelas,
  postPerangkatKelas,
  putPerangkatKelas,
} from "../controller/perangkatKelas.js";
import {
  deleteWaktu,
  getWaktu,
  postWaktu,
  putWaktu,
} from "../controller/waktu.js";
import {
  deleteBooking,
  getBooking,
  postBooking,
  putBooking,
  scheduleBooking,
} from "../controller/booking";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  publishMessage,
  sendBufferAudio,
  subscribeMessage,
} from "../controller/mqtt.js";
import {
  deletePerangkat,
  getPerangkat,
  postPerangkat,
  putPerangkat,
} from "../controller/Perangkat.js";

const router = express.Router();

//Authitentication
router.get("/me/:id", verifyToken, Me);
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
router.post("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUsersbyId);
router.post("/users/create", verifyToken, postUsers);
router.put("/users/update/:id", verifyToken, putUsers);
router.delete("/users/delete/:id", verifyToken, deleteUsers);
router.post("/resetpassword", verifyToken, resetPassword);

//CRUD Units
router.get("/units", getUnitsAll);
router.post("/units", verifyToken, getUnits);
router.get("/units/:id", verifyToken, getUnitsbyId);
router.post("/units/create", verifyToken, postUnits);
router.put("/units/update/:id", verifyToken, putUnits);
router.delete("/units/delete/:id", verifyToken, deleteUnits);

//CRUD Kelas
router.post("/kelas", verifyToken, getKelas);
router.get("/kelas/:id", verifyToken, getKelasbyId);
router.post("/kelas/create", verifyToken, postKelas);
router.put("/kelas/update/:id", verifyToken, putKelas);
router.delete("/kelas/delete/:id", verifyToken, deleteKelas);

//CRUD Operator
router.post("/operator", verifyToken, getOperator);
router.get("/operator/:id", verifyToken, getOperatorbyId);
router.post("/operator/create", verifyToken, postOperator);
router.put("/operator/update/:id", verifyToken, putOperator);
router.delete("/operator/delete/:id", verifyToken, deleteOperator);

//CRUD Perangkat
router.post("/perangkat", getPerangkat);
router.post("/perangkat/create", postPerangkat);
router.put("/perangkat/update/:id", putPerangkat);
router.delete("/perangkat/delete/:id", deletePerangkat);

//CRUD Datastream
router.post("/datastream", getDatastream);
router.post("/datastream/create", postDatastream);
router.put("/datastream/update/:id", putDatastream);
router.delete("/datastream/delete/:id", deleteDatastream);

//CRUD Perangkat Kelas
router.post("/perangkatkelas", getPerangkatKelas);
router.post("/perangkatkelas/create", postPerangkatKelas);
router.put("/perangkatkelas/update/:id", putPerangkatKelas);
router.delete("/perangkatkelas/delete/:id", deletePerangkatKelas);

//CRUD Waktu
router.get("/waktu", getWaktu);
router.post("/waktu/create", postWaktu);
router.put("/waktu/update/:id", putWaktu);
router.delete("/waktu/delete/:id", deleteWaktu);

//CRUD Booking
router.post("/booking", getBooking);
router.post("/booking/create", postBooking);
router.put("/booking/update/:id", putBooking);
router.delete("/booking/delete/:id", deleteBooking);
router.post("/schedulebooking", scheduleBooking);

//MQTT
router.post("/mqtt/publish", verifyToken, publishMessage);
router.post("/mqtt/subscribe", subscribeMessage);
router.post("/websocket/sendbufferaudio", sendBufferAudio);

export default router;
