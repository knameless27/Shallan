const {Users} = require("../models/UsersModel");

async function createAndInsertData(req, res) {
  try {
    //   Sincroniza el modelo con la base de datos
    await Users.sync();

    //   Agrega un registro a la tabla
    return console.log(req)
    const nuevoUsuario = await Users.create({
      nombre: "ddwwd",
      email: "juadsdssdn@dsddssdaaa.cxom",
      edad: 21,
    });

    console.log("Registro agregado a la tabla:", nuevoUsuario.toJSON());
  } catch (error) {
    console.error("Error:", error);
  }
}

async function findUsers(req, res) {
  const users = await Users.findAll();
  const userArr = users.map((u) => u.toJSON())
  res.status(200).send({
    users: userArr
  })
}

module.exports = {
  findUsers,
  createAndInsertData,
};
