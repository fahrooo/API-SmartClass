import { Op } from "sequelize";
import Kelas from "../models/KelasModel";

export const getKelas = async (req, res) => {
    const search = req.body.search;
    const page = parseInt(req.body.page) - 1;
    const limit = parseInt(req.body.limit);
    const offset = limit * page;
    const totalRows = await Kelas.count({
      where: {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
  
    const totalPage = Math.ceil(totalRows / limit);
  
    try {
      const kelas = await Kelas.findAll({
        where: {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        offset: offset,
        limit: limit,
        attributes: ["id", "nama"],
      });
  
      res.status(kelas.length ? 200 : 404).json({
        status: kelas.length ? 200 : 404,
        msg: kelas.length ? "Data Found" : "Data Not Found",
        data: kelas.length ? kelas : null,
        page: page + 1,
        limit: limit,
        rows: offset + 1,
        rowsPage: offset + 1 + kelas.length - 1,
        totalRows: kelas.length ? totalRows : null,
        totalPage: kelas.length ? totalPage : null,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        msg: "Internal Server Error",
        error: error,
      });
    }
  };