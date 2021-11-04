
function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://168.138.247.22:80/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


//Manejador GET
function autoInicioReservation(){
    console.log("se esta ejecutando tabla Reservation")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
            let $select = $("#Select-Reservation");
            $.each(respuesta, function (_id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}

function pintarRespuestaReservation(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";        
        myTable+="<td>"+respuesta[i].status+"</td>";        
        myTable+="<td>"+respuesta[i].client.name+"</td>";        
        myTable+="<td>"+respuesta[i].car.name+"</td>";
        myTable+="<td> <button onclick=' actualizarReservation("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReservation("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservation").html(myTable);
}

//Manejador "POST"
function agregarReservation()

    {  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            car:{idCar: +$("#Select-Car").val()},
            client:{idClient: +$("#Select-Client").val()},
            
    }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://168.138.247.22:80/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                //Limpiar Campos
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                //Listar Tabla

                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    
}


//Manejador DELETE
function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://168.138.247.22:80/api/Reservation/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosReservation(id) {
    $.ajax({
        dataType: 'json',
        url:"http://168.138.247.22:80/api/Reservation/update",
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);
            $("#status").val(item.status);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarReservation(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            skate:{id: +$("#select-skate").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'JSON',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://168.138.247.22:80/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado5").empty();

                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}



function guardarReservation()
{
    let var2 = 
    {
        startDate:$("#Reservationinicio").val(),
        devolutionDate:$("#Reservationfinal").val(),
        status:$("#Status").val(),
        client:{idClient: +$("#Select-Client").val()},
        car:{idCar: +$("#Select-Car").val()},
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://140.238.133.71:8080/api/Reservation/save",
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente la Reservation");
            alert("Se guardo correctamente la Reservation");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la Reservation");
        }
    });
}





/** 
function autoInicioReservation(){
    console.log("se esta ejecutando tabla Reservation")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
            let $select = $("#Select-Reservation");
            $.each(respuesta, function (_id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}

function pintarRespuestaReservation(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";        
        myTable+="<td>"+respuesta[i].status+"</td>";        
        myTable+="<td>"+respuesta[i].client+"</td>";        
        myTable+="<td>"+respuesta[i].car+"</td>";
        myTable+="<td> <button onclick=' actualizarReservation("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReservation("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservation").html(myTable);
}

function guardarReservation()
{
    let var2 = 
    {
        startDate:$("#Reservationinicio").val(),
        devolutionDate:$("#Reservationfinal").val(),
        status:$("#Status").val(),
        client:{idClient: +$("#Select-Client").val()},
        car:{idCar: +$("#Select-Car").val()},
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://140.238.133.71:8080/api/Reservation/save",
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente la Reservation");
            alert("Se guardo correctamente la Reservation");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la Reservation");
        }
    });
}

*/