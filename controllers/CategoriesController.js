const { Categories } = require("../models/CategoriesModel");

async function all(req, res) {
  if (req.method == 'GET' && req.params.id) {
    try {
        const categorias = await Categories.findByPk(req.params.id, {
          attributes: { exclude: ["BookId"] },
        });

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
  switch (req.method) {
    case "POST":
      try {
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
      try {
        const categorias = await Categories.findAll({
          attributes: { exclude: ["BookId"] },
        });

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
        const catAntigua = await Categories.findByPk(req.params.id, {
            attributes: { exclude: ["BookId"] },
          });
        if (catAntigua === null) {
          res.status(400).send({
            message: "Categoria no encontrada!",
            status: "Error",
          });
        }
        const nuevaCategoria = await Categories.update(
          {
            name: req.body.name,
            updatedAd: new Date(),
            status: req.body.status,
          },
          {
            where: {
              name: req.body.name,
              status: 1,
            },
          },
          {
            attributes: { exclude: ["BookId"] },
          }
        );

        res.status(200).send({
          message: "Categoria agregada correctamente",
          data: nuevaCategoria,
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
        const nuevaCategoria = await Categories.create({
          name: req.body.name,
          status: 1,
        });

        res.status(400).send({
          message: "Categoria agregada correctamente",
          data: nuevaCategoria.toJSON(),
          status: "Success",
        });
      } catch (error) {
        res.status(400).send({
          message: "Revise los datos",
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

module.exports = {
  all,
};
