const storage = require('./storage')

function addChat( param1, param2 ) {
    return new Promise((resolve, reject) => {
        const fullChat = {
            user1: param1,
            user2: param2
        }
        storage.add(fullChat)
        return resolve( fullChat )
    })
}

function getChats( userId) {
    return new Promise((resolve, reject) => {
        resolve(storage.get(userId))
    })
}

function getChatExiste( userId, userId2 ) {
    return new Promise((resolve, reject) => {
        resolve(storage.get2(userId, userId2))
    })
}

module.exports = {
    addChat,
    getChats,
    getChatExiste
}