import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Booking = db.define(
  "booking",
  {
    id_user: {
      type: DataTypes.INTEGER,
    },
    id_kelas: {
      type: DataTypes.INTEGER,
    },
    id_waktu: {
      type: DataTypes.INTEGER,
    },
    waktu_pemesanan: {
      type: DataTypes.DATE,
    },
    is_booking: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    code_akses: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Booking;

(async () => {
  await db.sync();
})();
