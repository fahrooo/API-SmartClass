import { Op } from "sequelize";
import Datastream from "../models/DatastreamModel";
import Perangkat from "../models/PerangkatModel";

export const getDatastream = async (req, res) => {
  const { filter_perangkat, filter_nama, id_perangkat, nama } = req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  if (filter_nama == true && filter_perangkat == true) {
    const totalRows = await Datastream.count({
      where: {
        [Op.and]: [
          { nama: { [Op.substring]: nama } },
          { id_perangkat: id_perangkat },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });
    Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });

    const datastream = await Datastream.findAll({
      where: {
        [Op.and]: [
          { nama: { [Op.substring]: nama } },
          { id_perangkat: id_perangkat },
        ],
      },
      include: [Perangkat],
      offset: offset,
      limit: limit,
      order: [["id_perangkat", "ASC"]],
    });

    res.status(200).json({
      status: datastream.length ? 200 : 404,
      message: datastream.length ? "Data Found" : "Data Not Found",
      data: datastream.length ? datastream : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + datastream.length - 1,
      totalRows: datastream.length ? totalRows : null,
      totalPage: datastream.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_perangkat == false) {
    const totalRows = await Datastream.count({
      where: { nama: { [Op.substring]: nama } },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });
    Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });

    const datastream = await Datastream.findAll({
      where: { nama: { [Op.substring]: nama } },
      include: [Perangkat],
      offset: offset,
      limit: limit,
      order: [["id_perangkat", "ASC"]],
    });

    res.status(200).json({
      status: datastream.length ? 200 : 404,
      message: datastream.length ? "Data Found" : "Data Not Found",
      data: datastream.length ? datastream : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + datastream.length - 1,
      totalRows: datastream.length ? totalRows : null,
      totalPage: datastream.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_perangkat == true) {
    const totalRows = await Datastream.count({
      where: { id_perangkat: id_perangkat },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });
    Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });

    const datastream = await Datastream.findAll({
      where: { id_perangkat: id_perangkat },
      include: [Perangkat],
      offset: offset,
      limit: limit,
      order: [["id_perangkat", "ASC"]],
    });

    res.status(200).json({
      status: datastream.length ? 200 : 404,
      message: datastream.length ? "Data Found" : "Data Not Found",
      data: datastream.length ? datastream : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + datastream.length - 1,
      totalRows: datastream.length ? totalRows : null,
      totalPage: datastream.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_perangkat == false) {
    const totalRows = await Datastream.count({});

    const totalPage = Math.ceil(totalRows / limit);

    Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });
    Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });

    const datastream = await Datastream.findAll({
      include: [Perangkat],
      offset: offset,
      limit: limit,
      order: [["id_perangkat", "ASC"]],
    });

    res.status(200).json({
      status: datastream.length ? 200 : 404,
      message: datastream.length ? "Data Found" : "Data Not Found",
      data: datastream.length ? datastream : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + datastream.length - 1,
      totalRows: datastream.length ? totalRows : null,
      totalPage: datastream.length ? totalPage : null,
    });
  }
};

export const getDatastreambyId = async (req, res) => {
  const id = req.params.id;

  Datastream.belongsTo(Perangkat, { foreignKey: "id_perangkat" });
  Perangkat.hasMany(Datastream, { foreignKey: "id_perangkat" });

  const checkDatastreamById = await Datastream.findByPk(id, {
    include: [Perangkat],
  });

  if (checkDatastreamById === null) {
    return res.status(200).json({
      status: 404,
      message: "Datastream not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Datastream found",
    data: checkDatastreamById,
  });
};

export const postDatastream = async (req, res) => {
  const {
    id_perangkat,
    nama,
    turn_on,
    turn_off,
    default_value,
    max_value,
    min_value,
  } = req.body;

  const checkNamaDatastream = await Datastream.findAll({
    where: {
      [Op.and]: [
        {
          nama: nama,
        },
        { id_perangkat: id_perangkat },
      ],
    },
  });

  if (checkNamaDatastream.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Datastream already exist",
    });
  }

  try {
    const datastream = await Datastream.create({
      id_perangkat: id_perangkat,
      nama: nama,
      turn_on: turn_on,
      turn_off: turn_off,
      default_value: default_value,
      max_value: max_value,
      min_value: min_value,
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

export const putDatastream = async (req, res) => {
  const id = req.params.id;
  const {
    id_perangkat,
    nama,
    turn_on,
    turn_off,
    default_value,
    max_value,
    min_value,
  } = req.body;

  try {
    const checkNamaDatastream = await Datastream.findAll({
      where: {
        [Op.and]: [
          {
            nama: nama,
          },
          { id_perangkat: id_perangkat },
        ],
      },
    });

    if (checkNamaDatastream.length > 0) {
      return res.status(200).json({
        status: 400,
        message: "Datastream already exist",
      });
    }
    const datastream = await Datastream.update(
      {
        id_perangkat: id_perangkat,
        nama: nama,
        turn_on: turn_on,
        turn_off: turn_off,
        default_value: default_value,
        max_value: max_value,
        min_value: min_value,
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

export const deleteDatastream = async (req, res) => {
  const id = req.params.id;

  try {
    const datastreambyid = await Datastream.findAll({
      where: {
        id: id,
      },
    });

    if (datastreambyid.length > 0) {
      const datastream = await Datastream.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({ status: 404, message: "Datastream not found" });
    }
  } catch (error) {
    res.status(200).json({ status: 400, message: "Deleted failed" });
  }
};
