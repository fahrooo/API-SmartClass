import OperatorKelas from "../models/OperatorKelasModel";
import { Op } from "sequelize";
import Kelas from "../models/KelasModel";
import Users from "../models/usersModel";
import Units from "../models/UnitsModel";

export const getOperator = async (req, res) => {
  const { filter_unit, filter_nama, filter_kelas, nama, id_kelas, id_unit } =
    req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  Kelas.hasMany(OperatorKelas, { foreignKey: "id_kelas" });
  OperatorKelas.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Users.hasMany(OperatorKelas, { foreignKey: "id_user" });
  OperatorKelas.belongsTo(Users, { foreignKey: "id_user" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  if (filter_nama == true && filter_unit == true && filter_kelas == true) {
    const totalRows = await OperatorKelas.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == true && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_kelas == true) {
    const totalRows = await OperatorKelas.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == false && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }
};

export const postOperator = async (req, res) => {
  const { id_user, id_kelas } = req.body;

  const checkOperatorKelas = await OperatorKelas.findAll({
    where: {
      [Op.and]: [
        {
          id_user: id_user,
        },
        { id_kelas: id_kelas },
      ],
    },
  });

  if (checkOperatorKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Operator already exist",
    });
  }

  try {
    const operator = await OperatorKelas.create({
      id_user: id_user,
      id_kelas: id_kelas,
    });

    return res.status(200).json({
      status: 200,
      message: "Created successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Created failed",
    });
  }
};
