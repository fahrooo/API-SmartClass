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
import {
  deleteOperator,
  getOperator,
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
} from "../controller/booking";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { publishMessage, subscribeMessage } from "../controller/mqtt.js";
import {
  deletePerangkat,
  getPerangkat,
  postPerangkat,
  putPerangkat,
} from "../controller/Perangkat.js";

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
router.put("/operator/update/:id", putOperator);
router.delete("/operator/delete/:id", deleteOperator);

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

//MQTT
router.post("/mqtt/publish", publishMessage);
router.post("/mqtt/subscribe", subscribeMessage);

export default router;
