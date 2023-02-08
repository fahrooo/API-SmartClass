import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PerangkatKelas = db.define(
  "perangkat_kelas",
  {
    id_kelas: {
      type: DataTypes.INTEGER,
    },
    id_datastream: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default PerangkatKelas;

(async () => {
  await db.sync();
})();
