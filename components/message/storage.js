const conexion = require("../../db")

function addMessage( message ) {
    sentencia = `INSERT INTO public.tbl_messages(mensaje, fk_id_chat) VALUES ('${message.m1}', ${message.m2});`
    conexion.query(sentencia)
    return true
}

async function getMessages( chat1, chat2 ) {
    sentencia = `SELECT mensaje, c."fk_userE",c."fk_userR" FROM tbl_messages m inner join tbl_chats c on m.fk_id_chat = c.id_chat where m.fk_id_chat=${chat1} or m.fk_id_chat=${chat2} ORDER BY m.orden asc;`
    //sentencia = "SELECT * FROM public.tbl_users where id_user="+filtroUsuario+";"
    const resultados = await conexion.query(sentencia)
    return resultados.rows;
}    

async function updateMessage(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.message = message
    const newMessage = await foundMessage.save()
    return newMessage
} 

function deleteMessage(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage
    //get
    //delete
}