






/**$select.append('<option value='+name.idGama+'>'+name.(aca  pude  poner el  dato   que  desea  llamar para  llenar el  boton selct) '</option>');
 * 
 * -------tabla cliente-------
 * 
 * GET relacion gama             (X)
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
 *

  
 let (nombre de vatiable) = respuesta[i]client? respuesta[i].cliente.(aca  lo  que  quiera ): null 
 
 myTable+="<td>"+(el nombre de la variable de la condicional )+"</td>";

/** PINTAR TABLA */
function pintarRespuestaMessage(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].cars.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td> <button onclick=' actualizarMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick=' borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
}

/** GET */
 function autoInicioMessage(){
    console.log("se esta ejecutando tabla Mensaje")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    
    });

}

-
function guardarMessage(){
    let var2 = 
    {
        messageText:$("#messageText").val(""),
        client:{client: $("#select-client").val("")},
        cars:{idCar:+$("#select-car").val("")},
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://140.238.133.71:8080/api/Message/save",
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente la gama");
            alert("Se guardo correctamente la gama");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la gama");
        }
    });
}
/**
function actualizarMessage(idElemento){
    let myData=
    {
        idMessage:idElemento,
        messageText:$("#messageText").val(),
        client:{id: $("#select-client").val()},
        car:{id: $("#select-car").val()},
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Gama/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#messageText").val("");
            autoInicioMessage();
            alert("Se ha actualizado correctamente la gama")

        }

    });
}

/** DELETE 

function borrarMessage(idElemento){
    let myData={
        id:idElemento,
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){
            $("#resultadoGama").empty();
            autoInicioGama();
            alert("Se ha borrado correctamente el mensaje")
        }
    });
}  


*/