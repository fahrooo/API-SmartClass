import Users from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";
import Units from "../models/UnitsModel";
import generator from "generate-password";

dotenv.config();

export const Me = async (req, res) => {
  const id = req.params.id;

  try {
    const me = await Users.findOne({
      where: { id: id },
      attributes: ["id_unit", "nama", "role"],
    });

    return res.status(200).json({
      status: 200,
      message: "Data session",
      data: me,
    });
  } catch (error) {}
};

export const Register = async (req, res) => {
  const { nama, email, nik, id_unit, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res.status(200).json({
      status: 400,
      message: "Password dan Confirm Password Tidak Sama",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const checkEmailUser = await Users.findAll({
    where: {
      email: email,
    },
  });

  const checkNikUser = await Users.findAll({
    where: {
      nik: nik,
    },
  });

  if (checkNikUser.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "NIK already exist",
    });
  }

  if (checkEmailUser.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Email already exist",
    });
  }

  try {
    const codeOtp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const source = `<div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <div
          style="
            background-color: #eef1f2;
            width: 639px;
            height: 350px;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            border-radius: 40px;
          "
        >
          <div
            style="
              background-color: #355d77;
              padding-left: 20px;
              padding-right: 20px;
              height: 70px;
              justify-content: center;
              align-items: center;
              display: flex;
              border-top-left-radius: 40px;
              border-top-right-radius: 40px;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <div style="margin-left: auto; margin-right: auto">
              <h1 style="color: #ffffff">Innovation Connect</h1>
            </div>
          </div>
          <div style="padding: 30px;">
            <p style="margin-bottom: 0px; font-size: 20px">Selamat datang,</p>
            <p style="margin: 0px; margin-top: 10px; font-size: 20px">
              Berikut kode <strong>OTP</strong> untuk melakukan aktivasi akun
            </p>
          </div>
          <div style="padding-left: 100px; padding-right: 100px">
            <div style="background-color: #d9d9d9">
              <h1 style="font-size: 30px">${codeOtp}</h1>
            </div>
          </div>
        </div>
      </div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mail_config = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifikasi Email",
      html: source,
    };

    transporter.sendMail(mail_config, async function (err, info) {
      if (!err) {
        const users = await Users.create({
          nama: nama,
          nik: nik,
          id_unit: id_unit,
          role: "peserta",
          email: email,
          password: hashPassword,
          is_active: false,
          code_otp: codeOtp,
        });

        return res.status(200).json({
          status: 200,
          message: "Silahkan verifikasi email",
          data: { nama, email },
        });
      } else {
        return res.status(200).json({
          status: 400,
          message: "Email not sent",
          data: err.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const updateEmail = async (req, res) => {
  const { new_email, old_email } = req.body;

  try {
    const codeOtp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const source = `<div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <div
        style="
          background-color: #eef1f2;
          width: 639px;
          height: 350px;
          text-align: center;
          font-family: Arial, Helvetica, sans-serif;
          border-radius: 40px;
        "
      >
        <div
          style="
            background-color: #355d77;
            padding-left: 20px;
            padding-right: 20px;
            height: 70px;
            justify-content: center;
            align-items: center;
            display: flex;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <div style="margin-left: auto; margin-right: auto">
            <h1 style="color: #ffffff">Innovation Connect</h1>
          </div>
        </div>
        <div style="padding: 30px;">
          <p style="margin-bottom: 0px; font-size: 20px">Selamat datang,</p>
          <p style="margin: 0px; margin-top: 10px; font-size: 20px">
            Berikut kode <strong>OTP</strong> untuk melakukan aktivasi akun
          </p>
        </div>
        <div style="padding-left: 100px; padding-right: 100px">
          <div style="background-color: #d9d9d9">
            <h1 style="font-size: 30px">${codeOtp}</h1>
          </div>
        </div>
      </div>
    </div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mail_config = {
      from: process.env.EMAIL_USER,
      to: new_email,
      subject: "Verifikasi Email",
      html: source,
    };

    transporter.sendMail(mail_config, function (err, info) {
      if (err) {
        console.log(err);
      }
    });

    await Users.update(
      { email: new_email, code_otp: codeOtp },
      {
        where: { email: old_email },
      }
    );

    return res
      .status(200)
      .json({ status: 200, message: "Email updated successfuly" });
  } catch (error) {
    return res.status(200).json({
      status: 404,
      message: "Email not found",
    });
  }
};

export const sendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findAll({
      where: { email: email },
    });

    const isActive = user[0].is_active;

    if (user.length > 0) {
      if (isActive == true) {
        const codeOtp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });

        const source = `<div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <div
          style="
            background-color: #eef1f2;
            width: 639px;
            height: 350px;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            border-radius: 40px;
          "
        >
          <div
            style="
              background-color: #355d77;
              padding-left: 20px;
              padding-right: 20px;
              height: 70px;
              justify-content: center;
              align-items: center;
              display: flex;
              border-top-left-radius: 40px;
              border-top-right-radius: 40px;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <div style="margin-left: auto; margin-right: auto">
              <h1 style="color: #ffffff">Innovation Connect</h1>
            </div>
          </div>
          <div style="padding: 30px;">
            <p style="margin-bottom: 0px; font-size: 20px">Selamat datang,</p>
            <p style="margin: 0px; margin-top: 10px; font-size: 20px">
              Berikut kode <strong>OTP</strong> untuk melakukan aktivasi akun
            </p>
          </div>
          <div style="padding-left: 100px; padding-right: 100px">
            <div style="background-color: #d9d9d9">
              <h1 style="font-size: 30px">${codeOtp}</h1>
            </div>
          </div>
        </div>
      </div>`;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mail_config = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Verifikasi Email",
          html: source,
        };

        transporter.sendMail(mail_config, function (err, info) {
          if (err) {
            console.log(err);
          }
        });

        await Users.update(
          { code_otp: codeOtp },
          {
            where: { email: email },
          }
        );
        return res.status(200).json({ status: 200, message: "Email verified" });
      }

      const codeOtp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const source = `<div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <div
        style="
          background-color: #eef1f2;
          width: 639px;
          height: 350px;
          text-align: center;
          font-family: Arial, Helvetica, sans-serif;
          border-radius: 40px;
        "
      >
        <div
          style="
            background-color: #355d77;
            padding-left: 20px;
            padding-right: 20px;
            height: 70px;
            justify-content: center;
            align-items: center;
            display: flex;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <div style="margin-left: auto; margin-right: auto">
            <h1 style="color: #ffffff">Innovation Connect</h1>
          </div>
        </div>
        <div style="padding: 30px;">
          <p style="margin-bottom: 0px; font-size: 20px">Selamat datang,</p>
          <p style="margin: 0px; margin-top: 10px; font-size: 20px">
            Berikut kode <strong>OTP</strong> untuk melakukan aktivasi akun
          </p>
        </div>
        <div style="padding-left: 100px; padding-right: 100px">
          <div style="background-color: #d9d9d9">
            <h1 style="font-size: 30px">${codeOtp}</h1>
          </div>
        </div>
      </div>
    </div>`;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mail_config = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verifikasi Email",
        html: source,
      };

      transporter.sendMail(mail_config, function (err, info) {
        if (err) {
          console.log(err);
        }
      });

      await Users.update(
        { code_otp: codeOtp },
        {
          where: { email: email },
        }
      );

      return res
        .status(200)
        .json({ status: 200, message: "Email sent successfully" });
    }
  } catch (error) {
    return res.status(200).json({
      status: 404,
      message: "Email not found",
    });
  }
};

export const checkVerifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findAll({
      where: { email: email },
    });

    const isActive = user[0].is_active;

    if (user.length > 0) {
      if (isActive == true) {
        return res.status(200).json({ status: 200, message: "Email verified" });
      }

      res.status(200).json({ status: 200, message: "Email not verified" });
    }
  } catch (error) {
    return res.status(200).json({
      status: 404,
      message: "Email not found",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code_otp } = req.body;

  try {
    const user = await Users.findAll({
      where: {
        email: email,
      },
    });

    const codeOTP = user[0].code_otp;

    if (user.length > 0) {
      if (codeOTP != code_otp) {
        return res.status(200).json({
          status: 400,
          message: "Kode OTP salah",
        });
      } else {
        await Users.update(
          { is_active: true },
          {
            where: {
              [Op.and]: [{ email: email }, { code_otp: code_otp }],
            },
          }
        );

        return res.status(200).json({
          status: 200,
          message: "Aktivasi Berhasil",
        });
      }
    } else {
      return res.status(200).json({
        status: 400,
        message: "Email not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.update(
      { password: hashPassword },
      {
        where: { email: email },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Password update failed",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    strict: true,
  });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const source = `<div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <div
          style="
            background-color: #eef1f2;
            width: 639px;
            height: 350px;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            border-radius: 40px;
          "
        >
          <div
            style="
              background-color: #355d77;
              padding-left: 20px;
              padding-right: 20px;
              height: 70px;
              justify-content: center;
              align-items: center;
              display: flex;
              border-top-left-radius: 40px;
              border-top-right-radius: 40px;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <div style="margin-left: auto; margin-right: auto">
              <h1 style="color: #ffffff">Innovation Connect</h1>
            </div>
          </div>
          <div style="padding: 30px;">
            <p style="margin-bottom: 0px; font-size: 20px">Selamat datang,</p>
            <p style="margin: 0px; margin-top: 10px; font-size: 20px">
              Berikut password akun aplikasi <strong>Innovation Connect</strong> anda
            </p>
          </div>
          <div style="padding-left: 100px; padding-right: 100px">
            <div style="background-color: #d9d9d9">
              <h1 style="font-size: 30px">${password}</h1>
            </div>
          </div>
        </div>
      </div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mail_config = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifikasi Email",
      html: source,
    };

    transporter.sendMail(mail_config, async function (err, info) {
      if (!err) {
        const users = await Users.update(
          {
            password: hashPassword,
          },
          {
            where: {
              email: email,
            },
          }
        );

        return res.status(200).json({
          status: 200,
          message: "Reset Password successfully",
        });
      } else {
        return res.status(200).json({
          status: 400,
          message: "Email not sent",
          data: err.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (user[0].is_active == false) {
      return res
        .status(200)
        .json({ status: 400, message: "Email is not verified" });
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) {
      return res.status(200).json({ status: 400, message: "Wrong Password" });
    }

    const userId = user[0].id;
    const nama = user[0].nama;
    const email = user[0].email;
    const unit = user[0].id_unit;
    const role = user[0].role;

    const accessToken = jwt.sign(
      { userId, nama, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, nama, email },
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

    res.status(200).json({
      status: 200,
      message: "Berhasil Login",
      data: { id: userId },
      accessToken,
    });
  } catch (error) {
    res.status(200).json({
      status: 404,
      message: "Email not found",
    });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(404).json({ status: 404, message: "Token Not Found" });
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
  return res
    .status(200)
    .json({ status: 200, message: "Clear Token Successful" });
};

export const getUsers = async (req, res) => {
  const { filter_nama, filter_unit, filter_role, nama, id_unit, role } =
    req.body;
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  if (filter_nama == true && filter_unit == true && filter_role == true) {
    const totalRows = await Users.count({
      where: {
        [Op.and]: [
          { nama: { [Op.substring]: nama } },
          { id_unit: id_unit },
          { role: role },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id_unit" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        [Op.and]: [
          { nama: { [Op.substring]: nama } },
          { id_unit: id_unit },
          { role: role },
        ],
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == true && filter_role == false) {
    const totalRows = await Users.count({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { id_unit: id_unit }],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { id_unit: id_unit }],
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == false && filter_role == true) {
    const totalRows = await Users.count({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { role: role }],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        [Op.and]: [{ nama: { [Op.substring]: nama } }, { role: role }],
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_role == true) {
    const totalRows = await Users.count({
      where: {
        [Op.and]: [{ id_unit: id_unit }, { role: role }],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        [Op.and]: [{ id_unit: id_unit }, { role: role }],
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == false && filter_role == false) {
    const totalRows = await Users.count({
      where: {
        nama: { [Op.substring]: nama },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        nama: { [Op.substring]: nama },
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_role == false) {
    const totalRows = await Users.count({
      where: {
        id_unit: id_unit,
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        id_unit: id_unit,
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == false && filter_role == true) {
    const totalRows = await Users.count({
      where: {
        role: role,
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      where: {
        role: role,
      },
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == false && filter_role == false) {
    const totalRows = await Users.count();

    const totalPage = Math.ceil(totalRows / limit);

    Units.hasMany(Users, { foreignKey: "id" });
    Users.belongsTo(Units, { foreignKey: "id_unit" });

    const users = await Users.findAll({
      include: [Units],
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
      attributes: ["id", "nik", "nama", "email", "is_active", "role"],
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  }
};

export const getUsersbyId = async (req, res) => {
  const id = req.params.id;

  Units.hasMany(Users, { foreignKey: "id" });
  Users.belongsTo(Units, { foreignKey: "id_unit" });

  const checkUserById = await Users.findByPk(id, {
    include: [Units],
    order: [["nama", "ASC"]],
  });

  if (checkUserById === null) {
    return res.status(200).json({
      status: 404,
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "User found",
    data: checkUserById,
  });
};

export const postUsers = async (req, res) => {
  const { nama, email, nik, id_unit, role, is_active } = req.body;

  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    strict: true,
  });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const checkEmailUser = await Users.findAll({
    where: {
      email: email,
    },
  });

  const checkNikUser = await Users.findAll({
    where: {
      nik: nik,
    },
  });

  if (checkNikUser.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "NIK already exist",
    });
  }

  if (checkEmailUser.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Email already exist",
    });
  }

  try {
    const source = `<div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <div
          style="
            background-color: #eef1f2;
            width: 639px;
            height: 350px;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            border-radius: 40px;
          "
        >
          <div
            style="
              background-color: #355d77;
              padding-left: 20px;
              padding-right: 20px;
              height: 70px;
              justify-content: center;
              align-items: center;
              display: flex;
              border-top-left-radius: 40px;
              border-top-right-radius: 40px;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <div style="margin-left: auto; margin-right: auto">
              <h1 style="color: #ffffff">Innovation Connect</h1>
            </div>
          </div>
          <div style="padding: 30px;">
            <p style="margin-bottom: 0px; font-size: 20px">Selamat datang,</p>
            <p style="margin: 0px; margin-top: 10px; font-size: 20px">
              Berikut password akun aplikasi <strong>Innovation Connect</strong> anda
            </p>
          </div>
          <div style="padding-left: 100px; padding-right: 100px">
            <div style="background-color: #d9d9d9">
              <h1 style="font-size: 30px">${password}</h1>
            </div>
          </div>
        </div>
      </div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mail_config = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifikasi Email",
      html: source,
    };

    transporter.sendMail(mail_config, async function (err, info) {
      if (!err) {
        const users = await Users.create({
          nama: nama,
          nik: nik,
          id_unit: id_unit,
          role: role,
          email: email,
          password: hashPassword,
          is_active: is_active,
        });

        return res.status(200).json({
          status: 200,
          message: "Created successfully",
        });
      } else {
        return res.status(200).json({
          status: 400,
          message: "Email not sent",
          data: err.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const putUsers = async (req, res) => {
  const { nama, email, nik, id_unit, role, is_active } = req.body;
  const id = req.params.id;

  const userbyid = await Users.findAll({ where: { id: id } });

  if (userbyid.length == 0) {
    return res.status(200).json({
      status: 404,
      message: "User not found",
    });
  }

  const users = await Users.update(
    {
      nama: nama,
      nik: nik,
      id_unit: id_unit,
      role: role,
      email: email,
      is_active: is_active,
    },
    { where: { id: id } }
  );

  return res.status(200).json({
    status: 200,
    message: "Updated successfully",
  });
};

export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;

    const userbyId = await Users.findAll({
      where: {
        id: id,
      },
    });

    if (userbyId.length > 0) {
      const user = await Users.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      res.status(200).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
