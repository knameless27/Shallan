const { Users } = require("../models/UsersModel");
const { Books } = require("../models/BooksModel");
const { Categories } = require("../models/CategoriesModel");
const { User_Books } = require("../relationships");
const { Op } = require("sequelize");

async function all(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const categoria = await Categories.findByPk(req.body.categoryId);

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
        const categorias = await Books.findAll({ include: "Category" });

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
        const catAntigua = await Categories.findByPk(req.body.CategoryId);
        if (catAntigua === null) {
          res.status(400).send({
            message: "Categoria no encontrada!",
            status: "Error",
          });
        }
        await Books.update(
          {
            name: req.body.name,
            image: req.body.image,
            state: req.body.state,
            author: req.body.author,
            pages: req.body.pages,
            publication_date: req.body.publication_date,
            stock: req.body.stock,
            updatedAt: new Date(),
            CategoryId: req.body.CategoryId,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        const data = await Books.findByPk(req.params.id);

        res.status(200).send({
          message: "Libro editado correctamente",
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
            message: "Libro no encontrado!",
            status: "Error",
          });
        }
        await Books.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).send({
          message: "Libro eliminado correctamente",
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

async function findBook(req, res) {
  try {
    const categorias = await Books.findAll({
      where: { name: { [Op.like]: "%" + req.body.name + "%" } },
      include: "Category",
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

async function saveBook(req, res) {
  try {
    const libro = await Books.findByPk(req.body.bookId);
    const user = new Buffer(req.headers.auth, "base64");
    const userText = JSON.parse(user.toString("ascii"));
    const usuario = await Users.findByPk(userText.id);

    if (!libro || !usuario) {
      res.status(400).send({
        message: "Revise los datos!",
        status: "Error",
      });
    }

    if (libro.stock <= 0) {
      res.status(400).send({
        message: "No hay mas stock de ese libro!",
        status: "Error",
      });
    }
    const reserva = await User_Books.findOne({
      where: { UserId: usuario.id, BookId: req.body.bookId },
    });
    if (reserva) {
      res.status(200).send({
        message: "Ya tiene este libro reservado",
        data: reserva.toJSON(),
        status: "Warning",
      });
    }
    await Books.update(
      {
        name: libro.name,
        image: libro.image,
        state: libro.state,
        author: libro.author,
        pages: libro.pages,
        publication_date: libro.publication_date,
        stock: libro.stock - 1,
        updatedAt: new Date(),
        CategoryId: libro.categoryId,
      },
      {
        where: {
          id: libro.id,
        },
      }
    );
    const reservarLibro = await User_Books.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      BookId: req.body.bookId,
      UserId: usuario.id,
    });

    res.status(200).send({
      message: "Libro agregado correctamente",
      data: reservarLibro.toJSON(),
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

async function removeReservation(req, res) {
  try {
    const reserva = await User_Books.findByPk(req.params.id);
    if (reserva === null) {
      res.status(400).send({
        message: "Reserva no encontrada!",
        status: "Error",
      });
    }
    const libro = await Books.findByPk(reserva.BookId);
    await Books.update(
      {
        name: libro.name,
        image: libro.image,
        state: libro.state,
        author: libro.author,
        pages: libro.pages,
        publication_date: libro.publication_date,
        stock: libro.stock - 1,
        updatedAt: new Date(),
        CategoryId: libro.categoryId,
      },
      {
        where: {
          id: libro.id,
        },
      }
    );
    await User_Books.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send({
      message: "Reserva eliminada correctamente",
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
  saveBook,
  removeReservation,
  findBook,
};
