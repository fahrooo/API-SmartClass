import { Op } from "sequelize";
import Datastream from "../models/DatastreamModel";
import Kelas from "../models/KelasModel";
import PerangkatKelas from "../models/PerangkatKelasModel";
import Perangkat from "../models/PerangkatModel";
import Units from "../models/UnitsModel";
import db from "../config/Database";

export const getPerangkatKelas = async (req, res) => {
  const { filter_unit, filter_nama, filter_kelas, nama, id_kelas, id_unit } =
    req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  Kelas.hasMany(PerangkatKelas, { foreignKey: "id_kelas" });
  PerangkatKelas.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Datastream.hasMany(PerangkatKelas, { foreignKey: "id_datastream" });
  PerangkatKelas.belongsTo(Datastream, { foreignKey: "id_datastream" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });
  Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });
  Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });

  if (filter_nama == true && filter_unit == true && filter_kelas == true) {
    const totalRows = await PerangkatKelas.count({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const perangkatKelas = await PerangkatKelas.findAll({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_kelas", "ASC"],
        [db.col("id_perangkat"), "ASC"],
      ],
    });

    res.status(200).json({
      status: perangkatKelas.length ? 200 : 404,
      message: perangkatKelas.length ? "Data Found" : "Data Not Found",
      data: perangkatKelas.length ? perangkatKelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkatKelas.length - 1,
      totalRows: perangkatKelas.length ? totalRows : null,
      totalPage: perangkatKelas.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_kelas == true) {
    const totalRows = await PerangkatKelas.count({
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
          model: Datastream,
          include: [Perangkat],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const perangkatKelas = await PerangkatKelas.findAll({
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
          model: Datastream,
          include: [Perangkat],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_kelas", "ASC"],
        [db.col("id_perangkat"), "ASC"],
      ],
    });

    res.status(200).json({
      status: perangkatKelas.length ? 200 : 404,
      message: perangkatKelas.length ? "Data Found" : "Data Not Found",
      data: perangkatKelas.length ? perangkatKelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkatKelas.length - 1,
      totalRows: perangkatKelas.length ? totalRows : null,
      totalPage: perangkatKelas.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == true && filter_kelas == false) {
    const totalRows = await PerangkatKelas.count({
      where: {
        nama: { [Op.substring]: nama },
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const perangkatKelas = await PerangkatKelas.findAll({
      where: {
        nama: { [Op.substring]: nama },
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_kelas", "ASC"],
        [db.col("id_perangkat"), "ASC"],
      ],
    });

    res.status(200).json({
      status: perangkatKelas.length ? 200 : 404,
      message: perangkatKelas.length ? "Data Found" : "Data Not Found",
      data: perangkatKelas.length ? perangkatKelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkatKelas.length - 1,
      totalRows: perangkatKelas.length ? totalRows : null,
      totalPage: perangkatKelas.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == false && filter_kelas == false) {
    const totalRows = await PerangkatKelas.count({
      where: {
        nama: { [Op.substring]: nama },
      },
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const perangkatKelas = await PerangkatKelas.findAll({
      where: {
        nama: { [Op.substring]: nama },
      },
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_kelas", "ASC"],
        [db.col("id_perangkat"), "ASC"],
      ],
    });

    res.status(200).json({
      status: perangkatKelas.length ? 200 : 404,
      message: perangkatKelas.length ? "Data Found" : "Data Not Found",
      data: perangkatKelas.length ? perangkatKelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkatKelas.length - 1,
      totalRows: perangkatKelas.length ? totalRows : null,
      totalPage: perangkatKelas.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_kelas == false) {
    const totalRows = await PerangkatKelas.count({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const perangkatKelas = await PerangkatKelas.findAll({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_kelas", "ASC"],
        [db.col("id_perangkat"), "ASC"],
      ],
    });

    res.status(200).json({
      status: perangkatKelas.length ? 200 : 404,
      message: perangkatKelas.length ? "Data Found" : "Data Not Found",
      data: perangkatKelas.length ? perangkatKelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkatKelas.length - 1,
      totalRows: perangkatKelas.length ? totalRows : null,
      totalPage: perangkatKelas.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == false && filter_kelas == false) {
    const totalRows = await PerangkatKelas.count({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const perangkatKelas = await PerangkatKelas.findAll({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Datastream,
          include: [Perangkat],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_kelas", "ASC"],
        [db.col("id_perangkat"), "ASC"],
      ],
    });

    res.status(200).json({
      status: perangkatKelas.length ? 200 : 404,
      message: perangkatKelas.length ? "Data Found" : "Data Not Found",
      data: perangkatKelas.length ? perangkatKelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkatKelas.length - 1,
      totalRows: perangkatKelas.length ? totalRows : null,
      totalPage: perangkatKelas.length ? totalPage : null,
    });
  }
};

export const getPerangkatKelasbyId = async (req, res) => {
  const id = req.params.id;

  Kelas.hasMany(PerangkatKelas, { foreignKey: "id_kelas" });
  PerangkatKelas.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Datastream.hasMany(PerangkatKelas, { foreignKey: "id_datastream" });
  PerangkatKelas.belongsTo(Datastream, { foreignKey: "id_datastream" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });
  Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });
  Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });

  const checkPerangkatKelasById = await PerangkatKelas.findByPk(id, {
    include: [
      {
        model: Kelas,
        include: [Units],
      },
      {
        model: Datastream,
        include: [Perangkat],
      },
    ],
  });

  if (checkPerangkatKelasById === null) {
    return res.status(200).json({
      status: 404,
      message: "Perangkat Kelas not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Perangkat Kelas found",
    data: checkPerangkatKelasById,
  });
};

export const postPerangkatKelas = async (req, res) => {
  const { id_kelas, id_datastream, nama } = req.body;

  const checkPerangakatKelas = await PerangkatKelas.findAll({
    where: {
      [Op.and]: [
        {
          nama: nama,
        },
        { id_kelas: id_kelas },
        { id_datastream: id_datastream },
      ],
    },
  });

  if (checkPerangakatKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Perangkat kelas already exist",
    });
  }

  try {
    const perangkatKelas = await PerangkatKelas.create({
      id_kelas: id_kelas,
      id_datastream: id_datastream,
      nama: nama,
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

export const putPerangkatKelas = async (req, res) => {
  const id = req.params.id;
  const { id_kelas, id_datastream, nama } = req.body;

  const checkPerangakatKelas = await PerangkatKelas.findAll({
    where: {
      [Op.and]: [
        {
          nama: nama,
        },
        { id_kelas: id_kelas },
        { id_datastream: id_datastream },
      ],
    },
  });

  if (checkPerangakatKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Perangkat kelas already exist",
    });
  }

  try {
    const perangkatKelas = await PerangkatKelas.update(
      {
        id_kelas: id_kelas,
        id_datastream: id_datastream,
        nama: nama,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Updated failed",
    });
  }
};

export const deletePerangkatKelas = async (req, res) => {
  const id = req.params.id;

  try {
    const perangkatkelasbyid = await PerangkatKelas.findAll({
      where: {
        id: id,
      },
    });

    if (perangkatkelasbyid.length > 0) {
      const perangkatKelas = await PerangkatKelas.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Perangkat Kelas not found" });
    }
  } catch (error) {
    res.status(200).json({ status: 400, message: "Deleted failed" });
  }
};
