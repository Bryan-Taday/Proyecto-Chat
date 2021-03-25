const conexion = require("../../db")

function addChat( param ) {
    sentencia = `INSERT INTO public.tbl_chats("fk_userE", "fk_userR") VALUES (${param.user1}, ${param.user2}),(${param.user2}, ${param.user1})`;
    conexion.query(sentencia)
    return true
}

async function getChats( userId ) {
    //sentencia = 'SELECT name, lastname, id_chat FROM tbl_chats c INNER JOIN tbl_users u ON c."user_R" = u.id_user where c."user_E"='+userId+' ;';
    sentencia = `SELECT id_chat, c."fk_userE", c."fk_userR", name, lastname FROM tbl_chats c INNER JOIN tbl_users u ON c."fk_userR" = u.id_user where c."fk_userE"=${userId} or c."fk_userR"=${userId}`;
    const resultados = await conexion.query(sentencia)
    return resultados.rows;
}

module.exports = {
    add: addChat,
    get: getChats,
}