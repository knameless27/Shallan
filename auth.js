const { Users } = require("./models/UsersModel");

async function login(req, res, next) {
    try {
        const user = await Users.findOne({where: {email: req.body.email}})
        req.session.user = user.toJSON()
        console.log(req.session.user)
        res.send(user.toJSON())
        next()
    } catch (error) {
        res.send({
            error: error
        })
    }
}

module.exports = {
    login
}
