const { Categories } = require("../models/CategoriesModel");
const { Op } = require("sequelize");

async function all(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const categoriaAntigua = await Categories.findOne({
          where: {name: req.body.name},
        });
        if (categoriaAntigua) {
          res.status(400).send({
            message: "Esa categoria ya existe",
            status: "Error",
          });
        }
        const nuevaCategoria = await Categories.create({
          name: req.body.name,
          state: true,
        });
        res.status(200).send({
          message: "Categoria agregada correctamente",
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
          const categorias = await Categories.findByPk(req.params.id);

          res.status(200).send({
            data: categorias,
            status: "Success",
          });
        } catch (error) {
          res.status(404).send({
            message: "Categorias no encontradas",
            error: error,
            status: "Error",
          });
        }
      }
      try {
        const categorias = await Categories.findAll();

        res.status(200).send({
          data: categorias,
          status: "Success",
        });
      } catch (error) {
        res.status(404).send({
          message: "Categorias no encontradas",
          error: error,
          status: "Error",
        });
      }
      break;

    case "PUT":
      try {
        await Categories.update(
          {
            name: req.body.name,
            updatedAd: new Date(),
            state: req.body.state,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        const data = await Categories.findByPk(req.params.id);

        res.status(200).send({
          message: "Categoria editada correctamente",
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
        await Categories.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).send({
          message: "Categoria eliminada correctamente",
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

async function findCategory(req, res) {
  try {
    const categorias = await Categories.findAll({
      where: { name: { [Op.like]: "%" + req.body.name + "%" } },
    });
    res.status(200).send({
      data: categorias,
      status: "Success",
    });
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
  findCategory,
};
