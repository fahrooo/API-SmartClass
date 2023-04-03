import { Op } from "sequelize";
import Kelas from "../models/KelasModel";
import Units from "../models/UnitsModel";

export const getKelas = async (req, res) => {
  const { filter_unit, filter_nama, id_unit, nama } = req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  if (filter_nama == true && filter_unit == true) {
    const totalRows = await Kelas.count({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { id_unit: id_unit }],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Kelas.belongsTo(Units, { foreignKey: "id_unit" });
    Units.hasMany(Kelas, { foreignKey: "id_unit" });

    const kelas = await Kelas.findAll({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { id_unit: id_unit }],
      },
      include: [Units],
      offset: offset,
      limit: limit,
      order: [
        ["id_unit", "ASC"],
        ["nama", "ASC"],
      ],
    });

    res.status(200).json({
      status: kelas.length ? 200 : 404,
      message: kelas.length ? "Data Found" : "Data Not Found",
      data: kelas.length ? kelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + kelas.length - 1,
      totalRows: kelas.length ? totalRows : null,
      totalPage: kelas.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == false) {
    const totalRows = await Kelas.count({
      where: {
        nama: { [Op.substring]: nama },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Kelas.belongsTo(Units, { foreignKey: "id_unit" });
    Units.hasMany(Kelas, { foreignKey: "id_unit" });

    const kelas = await Kelas.findAll({
      where: {
        nama: { [Op.substring]: nama },
      },
      include: [Units],
      offset: offset,
      limit: limit,
      order: [
        ["id_unit", "ASC"],
        ["nama", "ASC"],
      ],
    });

    res.status(200).json({
      status: kelas.length ? 200 : 404,
      message: kelas.length ? "Data Found" : "Data Not Found",
      data: kelas.length ? kelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + kelas.length - 1,
      totalRows: kelas.length ? totalRows : null,
      totalPage: kelas.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true) {
    const totalRows = await Kelas.count({
      where: {
        id_unit: id_unit,
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Kelas.belongsTo(Units, { foreignKey: "id_unit" });
    Units.hasMany(Kelas, { foreignKey: "id_unit" });

    const kelas = await Kelas.findAll({
      where: {
        id_unit: id_unit,
      },
      include: [Units],
      offset: offset,
      limit: limit,
      order: [
        ["id_unit", "ASC"],
        ["nama", "ASC"],
      ],
    });

    res.status(200).json({
      status: kelas.length ? 200 : 404,
      message: kelas.length ? "Data Found" : "Data Not Found",
      data: kelas.length ? kelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + kelas.length - 1,
      totalRows: kelas.length ? totalRows : null,
      totalPage: kelas.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == false) {
    const totalRows = await Kelas.count();

    const totalPage = Math.ceil(totalRows / limit);

    Kelas.belongsTo(Units, { foreignKey: "id_unit" });
    Units.hasMany(Kelas, { foreignKey: "id_unit" });

    const kelas = await Kelas.findAll({
      include: [Units],
      offset: offset,
      limit: limit,
      order: [
        ["id_unit", "ASC"],
        ["nama", "ASC"],
      ],
    });

    res.status(200).json({
      status: kelas.length ? 200 : 404,
      message: kelas.length ? "Data Found" : "Data Not Found",
      data: kelas.length ? kelas : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + kelas.length - 1,
      totalRows: kelas.length ? totalRows : null,
      totalPage: kelas.length ? totalPage : null,
    });
  }
};

export const getKelasbyId = async (req, res) => {
  const id = req.params.id;

  Kelas.belongsTo(Units, { foreignKey: "id_unit" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });

  const checkkelasById = await Kelas.findByPk(id, { include: [Units] });

  if (checkkelasById === null) {
    return res.status(200).json({
      status: 404,
      message: "Kelas not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Kelas found",
    data: checkkelasById,
  });
};

export const postKelas = async (req, res) => {
  const { id_unit, nama, topic } = req.body;

  const checkNamaKelas = await Kelas.findAll({
    where: {
      [Op.and]: [
        {
          nama: nama,
        },
        { id_unit: id_unit },
      ],
    },
  });

  const checkTopicKelas = await Kelas.findAll({
    where: {
      [Op.and]: [
        {
          nama: nama,
        },
        { id_unit: id_unit },
      ],
    },
  });

  if (checkNamaKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Nama already exist",
    });
  }

  if (checkTopicKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Topic already exist",
    });
  }

  try {
    const kelas = await Kelas.create({
      id_unit: id_unit,
      nama: nama,
      topic: topic,
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

export const putKelas = async (req, res) => {
  const id = req.params.id;
  const { id_unit, nama, topic } = req.body;

  const kelasbyid = await Kelas.findAll({ where: { id: id } });

  if (kelasbyid.length == 0) {
    return res.status(200).json({
      status: 404,
      message: "Kelas not found",
    });
  }

  try {
    const kelas = await Kelas.update(
      {
        id_unit: id_unit,
        nama: nama,
        topic: topic,
      },
      {
        where: { id: id },
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

export const deleteKelas = async (req, res) => {
  try {
    const id = req.params.id;

    const kelasbyid = await Kelas.findAll({
      where: {
        id: id,
      },
    });

    if (kelasbyid.length > 0) {
      const kelas = await Kelas.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({ status: 404, message: "Kelas not found" });
    }
  } catch (error) {
    res.status(200).json({ status: 400, message: "Deleted failed" });
  }
};

export const updateCodeAkses = async (req, res) => {
  const { id, code_akses } = req.body;

  try {
    const kelas = await Kelas.update(
      {
        code_akses: code_akses,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Updated code akses successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Updated code akses failed",
    });
  }
};
