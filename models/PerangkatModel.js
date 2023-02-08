import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Perangkat = db.define(
  "perangkat",
  {
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Perangkat;

(async () => {
  await db.sync();
})();
