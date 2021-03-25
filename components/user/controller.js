const storage = require('./storage')

function addUser(name, lastname, user) {
    return new Promise((resolve, reject) => {
        if (!name || !lastname || !user) {
            console.error('[UserController] No hay nombre.')
            return reject('Los datos son incorrectos')
        }
        const data = {
            name: name,
            lastname: lastname,
            user: user
        }
        storage.add( data )
        return resolve( data )
    }) 
}

function getUser( filtro) {
    return new Promise((resolve, reject) => {
        resolve(storage.list(filtro))
    })
}

function updateUser(id, users, name, lastname) {
    return new Promise(async (resolve, reject) => {
        if (!users || !name || !lastname) {
            reject('Data inválida')
            return false
        }
        const result = await storage.update(id, users, name, lastname)
        resolve( result )
    })
}

function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Id inválida')
            return false
        }
        const result = storage.delete(id)
        resolve( result )
    })
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
}