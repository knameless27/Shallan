const { Users } = require("./models/UsersModel");

async function login(req, res, next) {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "Usuario no existe, por favor crearlo",
      });
    }
    const token = JSON.stringify(user);
    const buff = new Buffer(token).toString("base64");
    req.session.token = buff;
    res.send({
      token: buff,
      user: user.toJSON(),
    });
    next();
  } catch (error) {
    res.send({
      status: "error",
      message: "Error al iniciar sesion",
      error: error,
    });
  }
}

async function verifyUser(req, res, next) {
  try {
    if (req.session.token != undefined) {
      next();
    } else {
      res.status(401).send({
        message: "no ha iniciado sesion",
      });
    }
  } catch (error) {
    res.send({
      error: error,
    });
  }
}

async function verifyReader(req, res, next) {
  try {
    if (req.session.token != undefined) {
      const user = new Buffer(req.session.token, "base64");
      const userText = JSON.parse(user.toString("ascii"));
      switch (userText.RoleId) {
        case 3:
          res.status(401).send({
            message: "Rol no autorizado",
          });
          break;

        default:
          next();
          break;
      }
    } else {
      res.status(401).send({
        message: "no ha iniciado sesion",
      });
    }
  } catch (error) {
    res.send({
      error: error,
    });
  }
}

async function verifyLibrarian(req, res, next) {
  try {
    if (req.session.token != undefined) {
      const user = new Buffer(req.session.token, "base64");
      const userText = JSON.parse(user.toString("ascii"));
      switch (userText.RoleId) {
        case 2:
          res.status(401).send({
            message: "Rol no autorizado",
          });
          break;

        default:
          verifyReader(req, res, next);
          break;
      }
    } else {
      res.status(401).send({
        message: "no ha iniciado sesion",
      });
    }
  } catch (error) {
    res.send({
      error: error,
    });
  }
}

module.exports = {
  login,
  verifyUser,
  verifyReader,
  verifyLibrarian,
};
