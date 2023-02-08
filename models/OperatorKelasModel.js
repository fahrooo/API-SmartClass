import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const OperatorKelas = db.define(
  "operator_kelas",
  {
    id_user: {
      type: DataTypes.INTEGER,
    },
    id_kelas: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default OperatorKelas;

(async () => {
  await db.sync();
})();
