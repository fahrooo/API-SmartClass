import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Waktu = db.define(
  "waktu",
  {
    time_start: {
      type: DataTypes.TIME,
    },
    time_end: {
      type: DataTypes.TIME,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Waktu;

(async () => {
  await db.sync();
})();
