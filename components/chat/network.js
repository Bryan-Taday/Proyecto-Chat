const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.post('/', function(req, res) {
    controller.addChat(req.body.fk_userE, req.body.fk_userR)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((error) => {
            response.error(req, res, 'Internal Error.', 400, error)
        })
})

router.get('/:userId', function(req, res) {
    controller.getChats(req.params.userId)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(((error) => {
            response.error(req, res, 'Unexpected error.', 500, error)
        }))
});

router.get('/validarChatExiste/:userId/:userId2', function(req, res) {
    controller.getChatExiste(req.params.userId, req.params.userId2)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(((error) => {
            response.error(req, res, 'Unexpected error.', 500, error)
        }))
});

module.exports = router