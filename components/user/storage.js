const conexion = require("../../db")

function addUser(usuario) {
    sentencia = `INSERT INTO public.tbl_users(name, lastname, "user") VALUES ('${usuario.name}', '${usuario.lastname}', '${usuario.user}');`
    conexion.query(sentencia)
    return true;
}

async function getUser(filtroUsuario) {
    sentencia = `SELECT * FROM public.tbl_users u where u.user='${filtroUsuario}';`
    //sentencia = 'SELECT * FROM public.tbl_users where "user"='+"'"+filtroUsuario+"';"
    const resultados = await conexion.query(sentencia)
    console.log(resultados.rows);
    return resultados.rows;
    
}

async function updateUser(id, users, name, lastname) {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.users = users
    foundMessage.name = name
    foundMessage.lastname = lastname
    const newMessage = await foundMessage.save()
    return newMessage
}

async function deleteUser(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports =  {
    add: addUser,
    list: getUser,
    update: updateUser,
    delete: deleteUser
}