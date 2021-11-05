
function relacionStatus(){
    
    $.ajax({
        url:"http://140.238.133.71:8080/api/Status/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            let $select = $("#select-status");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idStatus+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


function relacionCar(){
    
    $.ajax({
        url:"http://140.238.133.71:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            let $select = $("#select-car");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


function relacionClient(){
    
    $.ajax({
        url:"http://140.238.133.71:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idCient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}

function relacionScore(){
    
    $.ajax({
        url:"http://140.238.133.71:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            let $select = $("#select-score");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idScore+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


/**
 * 
 * -------tabla cliente-------
 * 
 * GET relacion Car             (X)
 * GET relacion Client          (X)
 * GET relacion Score           (X)
 * 
 * ---------------------------
 * ------funciones CRUD-------
 * ---------------------------
 * 
 * tabla con botones             (X)
 * 
 * 
 * GET                           (X)
 * 
 * 
 * POST                          (X)
 * 
 * 
 * PUT                           (X)
 * 
 * 
 * DELETE                        (X)
 *  
 */

/** GET */
 function autoInicioReservation(){
    console.log("se esta ejecutando tabla Gama")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    
    });

}
/** PINTAR TABLA */
function pintarRespuestaReservation(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].car+"</td>";
        myTable+="<td>"+respuesta[i].client+"</td>";
        myTable+="<td>"+respuesta[i].score+"</td>";
        myTable+="<td> <button onclick=' actualizarReservation("+respuesta[i].idGama+")'>Actualizar</button>";
        myTable+="<td> <button onclick=' borrarReservation("+respuesta[i].idGama+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservacion").html(myTable);
}

/** POST */
function guardarReservation(){  
    let var2 = 
    {
        startDate:$("#Reservationinicio").val(),
        devolutionDate:$("#Reservationfinal").val(),
        status:{id: $("#select-status").val()},
        car:{id: $("#select-car").val()},
        client:{id: $("#select-client").val()},
        score:{id: $("#select-score").val()},
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
            console.log("Se guardo correctamente la reservacion");
            alert("Se guardo correctamente la reservacion");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la reservacion");
        }
    });
}

/** PUT */
function actualizarReservation(idElemento){   
    let myData=
    {
        idReservation:idElemento,
        startDate:$("#Reservationinicio").val(""),
        devolutionDate:$("#Reservationfinal").val(),
        status:{id: $("#select-status").val()},
        car:{id: $("#select-car").val()},
        client:{id: $("#select-client").val()},
        score:{id: $("#select-score").val()},
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#Reservationinicio").val("");
            $("#Reservationfinal").val("");
            autoInicioReservacion();
            alert("Se ha actualizado correctamente la reservacion")
        }

    });
}


/** DELETE */

function borrarReservation(idElemento){
    let myData={
        id:idElemento,
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            autoInicioCar();
            alert("Se ha borrado correctamente la Reserva")
        }
    });
}  


