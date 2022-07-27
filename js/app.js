
// AL RECARGAR LA PAGINA YA TIENEN QUE CARGAR LOS USUARIOS
window.addEventListener('load',function () {
    listarEmpleados();
})


// FUNCION QUE SIRVE PARA TRAER TODOS LOS EMPLEADOS ACTIVOS EN LA EMPRESA
function listarEmpleados() {
    let itemUsuario = 0;
    // USAMOS EL API DE FECH
    fetch('http://10.35.3.16:9898/api/es/usuario/empresa/v1/1')
         .then(function(dataServicio) {
                      // LA RESPUESTA DEL SERVICIO LA SERIALIZAMOS A FORMATO JSON
            return dataServicio.json();
         }).then(function(datosSerializadosJson){      // ITERAMOS EL JSON ARRAY EN LA TABLA
            console.clear();
            let tableBody = '';
            datosSerializadosJson.forEach(function(usuario){
                itemUsuario = itemUsuario + 1;
                // IMPRIMIMOS LOS DATOS EN CONSOLA PARA REVISAR LA DATA DEVUELTA POR EL SERVICIO
                // OJO SOLO CON FINES EDUCATIVOS
                console.log("***************************************");
                console.log("ID: "+ usuario.id);
                console.log("Nombre: "+ usuario.nombreCompleto);
                console.log("Email: " + usuario.email);
                console.log("Password: " + usuario.contrasenia);
                console.log("Fecha Creacion:" + usuario.estado);
                tableBody += ` <tr>
                <td id = ${'txtIdUsuario'+itemUsuario} class="titulo-columnas ocultar">${usuario.id}</td>
                <td id = ${'txtNombreCompleto'+itemUsuario} class="titulo-columnas">${usuario.nombreCompleto}</td>
                <td id = ${'txtPassword'+itemUsuario} class="titulo-columnas">${usuario.contrasenia}</td>
                <td id = ${'txtEmail'+itemUsuario} class="titulo-columnas">${usuario.email}</td>
                <td id = ${'txtEstado'+ itemUsuario} class="titulo-columnas">${usuario.estado}</td>
                <!-- BOTON DE MODIFICAR -->
                <td class="titulo-columnas">
                    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editarUsuario" 
                        onclick = modificarUsuario('${'txtIdUsuario' + itemUsuario}','${'txtNombreCompleto' + itemUsuario}','${'txtPassword'+ itemUsuario}','${'txtEmail'+ itemUsuario}','${'txtEstado'+ itemUsuario}')>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </button>
                </td>
                <!-- BOTON DE ELIMINAR -->
                <td class="titulo-columnas">
                    <button class="btn btn-outline-danger" data-bs-toggle="modal" onclick= eliminarUsuario('${'txtIdUsuario' + itemUsuario}')>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                           <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                       </svg>
                    </button>
                </td>
            </tr>`; 
            document.getElementById('cuerpoTabla').innerHTML = tableBody;
        })
    });
}

let usuarioType = {
    contrasenia: "string",
    email: "string",
    estado: "string",
    nombreCompleto: "string",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
};


function modificarUsuario(id,nombreCompleto,pass,email,estatus){
   usuarioType.idUsuario = document.getElementById(id).innerHTML;
   usuarioType.nombreCompleto = document.getElementById(nombreCompleto).innerHTML;
   usuarioType.contrasenia =  document.getElementById(pass).innerHTML;
   usuarioType.email = document.getElementById(email).innerHTML;
   usuarioType.estado = document.getElementById(estatus).innerHTML;
   document.getElementById('txtId').value = usuarioType.idUsuario;
   document.getElementById('txtModUsuario').value = usuarioType.nombreCompleto;
   document.getElementById('txtModPass').value = usuarioType.contrasenia;
   document.getElementById('txtModCorreo').value = usuarioType.email;
   if (usuarioType.estado === "ACTIVO"){
    document.getElementById('radio1').checked = true
   }
   if (usuarioType.estado === "INACTIVO"){
    document.getElementById('radio2').checked = true
   }
}


function confirmarModificacionDeUsuario(){
    // INSTANCIAMOS UN NUEVO OBJETO Y CAPTURAMOS LOS DATOS
    let usuarioModificar = {
        contrasenia: document.getElementById('txtModPass').value,
        email: document.getElementById('txtModCorreo').value,
        estado: "",
        nombreCompleto: document.getElementById('txtModUsuario').value,
        id: document.getElementById('txtId').value
    };

    // CAPTURAMOS LOS STATUS DEL USUARIOS
    if (document.getElementById('radio1').checked === true){usuarioModificar.estado = 'ACTIVO';}
    if (document.getElementById('radio2').checked === true){usuarioModificar.estado = 'INACTIVO';}
    
    // REALIZAMOS LA MODIFICACION DEL USUARIO
    fetch('http://10.35.3.16:9898/api/es/usuario/v1',
          {
            method: 'PUT',
            body: JSON.stringify(usuarioModificar),
            headers: {"Content-type": "application/json"}
          }
        ).then(respuestaServicio => respuestaServicio.json())
         .then(respuestaType => console.log(respuestaType));
}

function crearUsuario(){
    // INSTANCIAMOS UN NUEVO OBJETO Y CAPTURAMOS LOS DATOS
    let usuarioNuevo = {
        contrasenia: document.getElementById('txtPass').value,
        email: document.getElementById('txtCorreo').value,
        estado: "",
        nombreCompleto: document.getElementById('txtUsuario').value,
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    };
    // CAPTURAMOS LOS STATUS DEL USUARIOS
    if (document.getElementById('rbActivo').checked === true){usuarioNuevo.estado = 'ACTIVO';}
    if (document.getElementById('rbInactivo').checked === true){usuarioNuevo.estado = 'INACTIVO';}
    // REALIZAMOS LA MODIFICACION DEL USUARIO   
    console.log(JSON.stringify(usuarioNuevo));
    fetch('http://10.35.3.16:9898/api/es/usuario/v1',
        {
            method: 'POST',
            body: JSON.stringify(usuarioNuevo),
            headers: {"Content-type": "application/json"}
        }
    ).then(respuestaServicio => respuestaServicio.json())
     .then(respuestaType => console.log(respuestaType));
    listarEmpleados();
}


function eliminarUsuario(id){
    var idUsuarioEliminar = document.getElementById(id).innerHTML;
    let URI_ELIMINAR_USUARIO = 'http://10.35.3.16:9898/api/es/usuario/v1/'+idUsuarioEliminar;
    console.log(URI_ELIMINAR_USUARIO);
    fetch(URI_ELIMINAR_USUARIO ,
    {
        method: 'DELETE',
        headers: {"Content-type": "application/json"}
    }
).then(respuestaServicio => respuestaServicio.json())
 .then(respuestaType => console.log(respuestaType));
}

