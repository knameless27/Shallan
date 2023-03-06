function index(req, res) {
    res.status(200).send({
        message: 'Todo piola pa'
    });
}

module.exports = {
    index
}