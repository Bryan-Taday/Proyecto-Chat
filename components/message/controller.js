const use = require("./network")
const storage = require('./storage')
const config = require('../../config')
const socket = require("../../socket").socket

function addMessage(file, param2) {
    if(typeof file === 'string'){
        url = file
    }else{
        url = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/' + file.filename
    }
    return new Promise((resolve, reject) => {
        const fullMessage = {
            m1: url,
            m2: param2
        }
        storage.add( fullMessage )
        socket.io.emit('message', fullMessage)
        return resolve( fullMessage )
    })
}

function getMessages( filterChat1, filterChat2 ) {
    return new Promise((resolve, reject) => {
        resolve(storage.list( filterChat1, filterChat2 ))
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Data inválida')
            return false
        }
        const result = await storage.update(id, message)
        resolve( result )
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id invalido')
            return false
        }

        store.remove(id)
            .then(() => {
                resolve()
            })
            .catch(e => {
                reject(e)
            })
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}