const { Categories } = require("../models/CategoriesModel");

async function all(req, res) {
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
        const catAntigua = await Categories.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Categoria no encontrada!",
            status: "Error",
          });
        }
        await Categories.update(
          {
            name: req.body.name,
            updatedAd: new Date(),
            status: req.body.status,
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
        const catAntigua = await Categories.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Categoria no encontrada!",
            status: "Error",
          });
        }
        await Categories.destroy(
          {
            where: {
              id: req.params.id,
            },
          }
        );

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

module.exports = {
  all,
};
