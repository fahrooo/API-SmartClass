import Unit from "../models/UnitModel";
import Users from "../models/usersModel";
import { Op, where } from "sequelize";

export const getUnits = async (req, res) => {
  const search = req.body.search;
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;
  const totalRows = await Unit.count({
    where: {
      nama: {
        [Op.like]: "%" + search + "%",
      },
    },
  });

  const totalPage = Math.ceil(totalRows / limit);

  try {
    const unit = await Unit.findAll({
      where: {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
      offset: offset,
      limit: limit,
      attributes: ["id", "nama"],
    });

    res.status(unit.length ? 200 : 404).json({
      status: unit.length ? 200 : 404,
      msg: unit.length ? "Data Found" : "Data Not Found",
      data: unit.length ? unit : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + unit.length - 1,
      totalRows: unit.length ? totalRows : null,
      totalPage: unit.length ? totalPage : null,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      error: error,
    });
  }
};
