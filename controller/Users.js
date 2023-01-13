import Users from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";

export const Register = async (req, res) => {
  const { nama, email, nik, unit, jabatan, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password Tidak Sama" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const users = await Users.create({
      nama: nama,
      nik: nik,
      unit: unit,
      jabatan: jabatan,
      role: "Peserta",
      email: email,
      password: hashPassword,
    });
    res
      .status(201)
      .json({ status: 201, msg: "Register Berhasil", data: { nama, email } });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) {
      return res.status(400).json({ status: 400, msg: "Wrong Password" });
    }

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });

    res.status(200).json({ data: { id: userId, name, email }, accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(404).json({ status: 404, msg: "Token Not Found" });
  }

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) {
    return res.status(204);
  }

  const userId = user[0].id;

  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  res.clearCookie("refreshToken");
  return res.status(200).json({ status: 200, msg: "Clear Token Successful" });
};

export const getUsers = async (req, res) => {
  const search = req.body.search;
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;
  const totalRows = await Users.count({
    where: {
      [Op.or]: [
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });

  const totalPage = Math.ceil(totalRows / limit);

  try {
    const users = await Users.findAll({
      where: {
        [Op.or]: [
          {
            nama: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      attributes: ["id", "nama", "email"],
    });

    res.status(users.length ? 200 : 404).json({
      status: users.length ? 200 : 404,
      msg: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: (offset + 1) + (users.length) - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      data: null,
    });
  }
};

export const putUsers = async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const userbyId = await Users.findAll({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email"],
    });

    if (userbyId.length > 0) {
      const user = await Users.update(
        {
          name: name,
          email: email,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({
        status: 200,
        msg: "Data Updated Successfully",
        data: { ...req.body },
      });
    } else {
      res.status(404).json({ status: 404, msg: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, msg: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;

    const userbyId = await Users.findAll({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email"],
    });

    if (userbyId.length > 0) {
      const user = await Users.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        msg: "Data Deleted successfully",
      });
    } else {
      res.status(404).json({ status: 404, msg: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, msg: error.message });
  }
};
