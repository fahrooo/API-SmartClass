import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kelas = db.define(
  "classrooms",
  {
    id_unit: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
    topic: {
      type: DataTypes.STRING,
    },
    code_akses: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Kelas;

(async () => {
  await db.sync();
})();
