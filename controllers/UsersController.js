const { Users } = require("../models/UsersModel");
const { Roles } = require("../models/RolModel");
async function all(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const categoria = await Roles.findByPk(req.body.RoleId);

        if (!categoria) {
          res.status(400).send({
            message: "Este rol no existe!",
            status: "Error",
          });
        }

        const nuevaCategoria = await Users.create({
          name: req.body.name,
          state: true,
          email: req.body.email,
          password: req.body.password,
          createdAt: new Date(),
          updatedAt: new Date(),
          RoleId: req.body.RoleId,
        });

        if (!req.body.register) {
            res.status(200).send({
              message: "Usuario agregado correctamente",
              data: nuevaCategoria.toJSON(),
              status: "Success",
            });
        }
        req.session.user = nuevaCategoria.toJSON()
        res.status(200).send({
          message: "Usuario registrado correctamente",
          data: nuevaCategoria.toJSON(),
          status: "Success",
        });
      } catch (error) {
        res.status(400).send({
          message: "Revise los datos",
          error: error,
          status: "Error",
        });
      }
      break;

    case "GET":
      if (req.params.id) {
        try {
          const categorias = await Users.findByPk(req.params.id);

          res.status(200).send({
            data: categorias,
            status: "Success",
          });
        } catch (error) {
          res.status(404).send({
            message: "Users no encontrado",
            error: error,
            status: "Error",
          });
        }
      }
      try {
        const categorias = await Users.findAll();

        res.status(200).send({
          data: categorias,
          status: "Success",
        });
      } catch (error) {
        res.status(404).send({
          message: "Users no encontrados",
          error: error,
          status: "Error",
        });
      }
      break;

    case "PUT":
      try {
        const catAntigua = await Roles.findByPk(req.body.RoleId);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Rol no encontrado!",
            status: "Error",
          });
        }
        await Users.update(
          {
            name: req.body.name,
            state: req.body.state,
            email: req.body.email,
            password: req.body.password,
            updatedAt: new Date(),
            RoleId: req.body.RoleId,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        const data = await Users.findByPk(req.params.id);

        res.status(200).send({
          message: "Usuario editado correctamente",
          data: data.toJSON(),
          status: "Success",
        });
      } catch (error) {
        res.status(400).send({
          message: "Revise los datos",
          error: error,
          status: "Error",
        });
      }
      break;

    case "DELETE":
      try {
        const catAntigua = await Users.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Usuario no encontrado!",
            status: "Error",
          });
        }
        await Users.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).send({
          message: "Usuario eliminado correctamente",
          status: "Success",
        });
      } catch (error) {
        res.status(400).send({
          message: "Revise los datos",
          error: error,
          status: "Error",
        });
      }
      break;

    default:
      res.status(400).send({
        message: "Revise los datos",
        status: "Error",
      });
      break;
  }
}

async function register(req, res) {
    try {
      const user = await Users.findOne({where: {email: req.body.email}});
      if (user) {
        res.status(400).send({
          message: "Ya existe este correo!",
          status: "Error",
        });
      }
      req.body.RoleId = 3
      req.body.register = true
      all(req, res);
    } catch (error) {
      res.status(400).send({
        message: "Revise los datos",
        error: error,
        status: "Error",
      });
    }
  }

module.exports = {
  all,
  register
};
