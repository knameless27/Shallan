const { Books } = require("../models/BooksModel");
const { Categories } = require("../models/CategoriesModel");

async function all(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const categoria = await Books.findByPk(req.body.categoryId);

        if (!categoria) {
          res.status(400).send({
            message: "Esta categoria no existe!",
            status: "Error",
          });
        }

        const nuevaCategoria = await Books.create({
          name: req.body.name,
          image: req.body.image,
          state: true,
          author: req.body.author,
          pages: req.body.pages,
          publication_date: req.body.publication_date,
          stock: req.body.stock,
          createdAt: new Date(),
          updatedAt: new Date(),
          CategoryId: req.body.categoryId,
        });

        res.status(200).send({
          message: "Libro agregado correctamente",
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
          const categorias = await Books.findByPk(req.params.id);

          res.status(200).send({
            data: categorias,
            status: "Success",
          });
        } catch (error) {
          res.status(404).send({
            message: "Books no encontrado",
            error: error,
            status: "Error",
          });
        }
      }
      try {
        const categorias = await Books.findAll();

        res.status(200).send({
          data: categorias,
          status: "Success",
        });
      } catch (error) {
        res.status(404).send({
          message: "Books no encontrados",
          error: error,
          status: "Error",
        });
      }
      break;

    case "PUT":
      try {
        const catAntigua = await Books.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Libros no encontrado!",
            status: "Error",
          });
        }
        await Books.update(
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

        const data = await Books.findByPk(req.params.id);

        res.status(200).send({
          message: "Libros editado correctamente",
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
        const catAntigua = await Books.findByPk(req.params.id);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Libros no encontrado!",
            status: "Error",
          });
        }
        await Books.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).send({
          message: "Libros eliminado correctamente",
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
