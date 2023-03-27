const { Users } = require("./models/UsersModel");

async function login(req, res, next) {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    const token = JSON.stringify(user);
    console.log(btoa(token))
    // req.session.user = btoa(JSON.stringify(user.toJSON()));
    res.send({
      token: '',
      user: user.toJSON(),
    });
    next();
  } catch (error) {
    res.send({
      error: error,
    });
  }
}

async function verifyUser(req, res, next) {
  try {
    if (req.session.user != undefined) {
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
    if (req.session.user != undefined) {
      switch (req.session.user.RoleId) {
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
    if (req.session.user != undefined) {
      switch (req.session.user.RoleId) {
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
