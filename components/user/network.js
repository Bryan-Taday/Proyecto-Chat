const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.post('/', function(req, res) {
    controller.addUser(req.body.name, req.body.lastname, req.body.user)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida.', 400, error)
        })
})

router.get('/', function(req, res){
    const filter = req.query.user || null
    controller.getUser(filter)
        .then((userList) => {
            response.success(req, res, userList, 200)
        })
        .catch(((error) => {
            response.error(req, res, 'Unexpected error.', 500, error)
        }))
})

router.patch('/:id', function(req, res) {
    controller.updateUser(req.params.id, req.body.users, req.body.name, req.body.lastname)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error interno.', 500, error)
        })
})

router.delete('/:id', function(req, res) {
    controller.deleteUser(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error interno.', 500, error)
        })
})

module.exports = router