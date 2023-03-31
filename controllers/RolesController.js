const { Roles } = require("../models/RolModel");
const { Op } = require("sequelize");

async function all(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const nuevaCategoria = await Roles.create({
          name: req.body.name,
          state: true,
        });
        res.status(200).send({
          message: "Rol agregado correctamente",
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
        console.log('entra');
      if (req.params.id) {
        try {
          const categorias = await Roles.findByPk(req.params.id);

          res.status(200).send({
            data: categorias,
            status: "Success",
          });
        } catch (error) {
          res.status(404).send({
            message: "Roles no encontrado",
            error: error,
            status: "Error",
          });
        }
      }
      try {
        console.log('xd');
        const categorias = await Roles.findAll();

        res.status(200).send({
          data: categorias,
          status: "Success",
        });
      } catch (error) {
        console.log(error);
        res.status(404).send({
          message: "Roles no encontrados",
          error: error,
          status: "Error",
        });
      }
      break;

    case "PUT":
      try {
        const catAntigua = await Roles.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Rol no encontrado!",
            status: "Error",
          });
        }
        await Roles.update(
          {
            name: req.body.name,
            updatedAd: new Date(),
            state: req.body.status,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        const data = await Roles.findByPk(req.params.id);

        res.status(200).send({
          message: "Rol editado correctamente",
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
        const catAntigua = await Roles.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Rol no encontrado!",
            status: "Error",
          });
        }
        await Roles.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).send({
          message: "Rol eliminado correctamente",
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

async function findRoles(req, res) {
  try {
    const categorias = await Roles.findAll({
      where: { name: { [Op.like]: "%" + req.body.name + "%" } },
    });
    res.status(200).send({
      data: categorias,
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Revise los datos",
      error: error,
      status: "Error",
    });
  }
}
module.exports = {
  all,
  findRoles,
};
