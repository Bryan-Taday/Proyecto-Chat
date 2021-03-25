$(function(){
    $("#login").click(function(){
        var usuario = document.getElementById("nombre").value
        obtenerUsuario(usuario)
    })
    $("#register").click(function(){
        var name = document.getElementById("nameAdd").value
        var lastname = document.getElementById("lastnameAdd").value
        var user = document.getElementById("userAdd").value
        anadirUsuario(name, lastname, user)
    })
    $('#exampleModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
    $("#addChat").click(function(){
        var userChat =document.getElementById("userChat").value
        anadirChat(userChat)
    })
    $("#enviar").click(function(){
        var mensaje = document.getElementById("escribirM").value
        var id_chat_actual = sessionStorage.getItem("id_chatR_actual");
        enviarMensaje(mensaje, id_chat_actual);
    })
    $("#enviarArchivo").click(function(){
        var archivo = document.getElementById('ElBryan')
        var ruta = $('#ElBryan').val()
        var id_chat_actual = sessionStorage.getItem("id_chatR_actual")
        enviarArchivo(archivo, id_chat_actual, ruta)
    })
    $("#salir").click(function(){
        sessionStorage.setItem("id_user", "");
        window.location.replace('index.html')
    })
})

function cargaInicial(){
    mostrarUser(sessionStorage.getItem("Nombres"));
    mostrarChats(sessionStorage.getItem("id_user"));
}

function mostrarUser(userF){
    var usuario = document.getElementById("user")
    usuario.innerHTML=userF
}

function mostrarChats(userF){
    var chats = document.getElementById("chats")
    var usuario = sessionStorage.getItem("id_user")
    etiquetas= `<ul class="quitar-padding">`
    $.get("http://localhost:4000/chat/"+userF, function(response){
        var aux = response
        for (let i of response) {
            if(i.fk_userE==usuario){
                for(let j of aux){
                    if(j.fk_userE==i.fk_userR){
                        console.log(j.id_chat);
                        // etiquetas+= `<div class="container" onclick="abrirChat(${i.id_chat}, ${j.id_chat}, '${i.name} ${i.lastname}') ">${i.name} ${i.lastname}</div><hr>`
                        etiquetas+= `<li>
                                        <div class="chat-contacto" onclick="abrirChat(${i.id_chat}, ${j.id_chat}, '${i.name} ${i.lastname}') ">
                                        <div class="imagen-contacto">
                                            <i class="fas fa-user-circle fa-2x"></i>
                                        </div>
                                        <div class="nombre-info">
                                            <h5>${i.name} ${i.lastname}</h5>
                                            <p>Ultimo mensaje</p>
                                        </div>
                                        </div>
                                    </li>`;
                    }
                }
            }
        }
        etiquetas+= "</ul>"
        chats.innerHTML=etiquetas
    });
}
function mostrarmensajes(userE, userR, usuarioC){
    sessionStorage.setItem("id_chatE_actual", userE);
    sessionStorage.setItem("id_chatR_actual", userR);
    sessionStorage.setItem("nombre_actual", usuarioC);
    var mensajes = document.getElementById("chat")
    var usuarioContacto = document.getElementById("userContact")
    var usuario = sessionStorage.getItem("id_user")
    var etiquetas= ""
    $.get("http://localhost:4000/message?user1="+userE+"&user2="+userR, function(response){
        for (let i of response) {
            if(i.fk_userE==usuario){
                if(i.mensaje.substr(0,4)=="http"){
                    etiquetas += '<div><div class="d-inline-flex p-2 m-2 rounded border border-secondary bg-light">'+'<img src="'+i.mensaje+'" alt="..." class="img-thumbnail w-50">'+'</div></div>'
                }else{
                    etiquetas += '<div><div class="d-inline-flex p-2 m-2 rounded border border-secondary bg-light">'+i.mensaje+'</div></div>'
                }
            }else{
                if(i.mensaje.substr(0,4)=='http'){
                    etiquetas += '<div><div class="d-inline-flex p-2 m-2 rounded border border-secondary bg-primary">'+'<img src="'+i.mensaje+'" alt="..." class="img-thumbnail w-50">'+'</div></div>'
                }else{
                    etiquetas += '<div><div class="d-inline-flex p-2 m-2 rounded border border-secondary bg-primary">'+i.mensaje+'</div></div>'
                }
            }
        }
        usuarioContacto.innerHTML=usuarioC
        mensajes.innerHTML=etiquetas
    });
}

function obtenerUsuario(userF){
    $.get("http://localhost:4000/user?user="+userF, function(response){
        if(response.length > 0){
            for (let i of response) {
                sessionStorage.setItem("Nombres", i.name+" "+i.lastname);
                sessionStorage.setItem("id_user", i.id_user);
            }
            window.location.replace('chats.html')
        }else{
            alert('Usuario incorrecto o no existe')
        }
    });
}

function anadirUsuario(name, lastname, user){
    var settings = {
        "url": "http://localhost:4000/user",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({"name":name,"lastname":lastname,"user":user}),
      };
      $.ajax(settings).done(function (response) {
        if(response){
            alert("Usuario registrado, por favor ingrese con su nuevo usuario")
            location.reload()
        }else{
            alert("Error al registrar")
        }
      });
}

function anadirChat(userChat){
    var usuario = sessionStorage.getItem("id_user")
    $.get("http://localhost:4000/user?user="+userChat, function(response){
        if(response.length > 0){
            for(i of response){
                if(i.user==userChat){
                    var settings = {
                        "url": "http://localhost:4000/chat",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                          "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({"fk_userE":usuario,"fk_userR":i.id_user}),
                    };
                    $.ajax(settings).done(function (response) {
                    if(response){
                        alert("Chat Creado")
                        location.reload()
                    }else{
                        alert("Error al registrar")
                    }
                    });
                }
            }
        }else{
            alert("El usuario no existe")
        }
    });
    
}

function limpiar(){
    document.getElementById("nameAdd")
    document.getElementById("lastnameAdd")
    document.getElementById("userAdd")
}

function abrirChat(user1, user2, usuario){
    mostrarmensajes(user1, user2, usuario)
}

function enviarMensaje(param1, param2){
    var settings = {
        "url": "http://localhost:4000/message",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "Content-Type": "application/json"
        },
        "data": JSON.stringify({"mensaje":param1,"id_chat":param2,"opcion": 0}),
      };
      $.ajax(settings).done(function (response) {
          if(response){
              var param1 = sessionStorage.getItem("id_chatE_actual");
              var param2 = sessionStorage.getItem("id_chatR_actual");
              var param3 = sessionStorage.getItem("nombre_actual");
              mostrarmensajes(param1, param2, param3)
          }
      });
}
function enviarArchivo(param1, param2, ruta){
    var form = new FormData();
    form.append("file", param1.files[0], ruta);
    form.append("id_chat", param2);
    form.append("opcion", 1);

    var settings = {
        "url": "http://localhost:4000/message",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        if(response){
            var param1 = sessionStorage.getItem("id_chatE_actual");
            var param2 = sessionStorage.getItem("id_chatR_actual");
            var param3 = sessionStorage.getItem("nombre_actual");
            mostrarmensajes(param1, param2, param3)
        }
    });
}

function getSession(){
    console.log('se cargo');
    var session = document.getElementById('session');
    id = sessionStorage.getItem('id_user');
    session.innerHTML= 'id'+id;
}