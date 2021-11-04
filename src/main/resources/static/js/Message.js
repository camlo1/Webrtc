
function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://140.238.133.71:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#Select-Client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


function autoInicioMessage(){
    console.log("se esta ejecutando tabla Mesage")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    
    })

}

function pintarRespuestaMessage(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].car+"</td>";
        myTable+="<td>"+respuesta[i].client+"</td>";
        myTable+="<td> <button onclick=' actualizarMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
}

function guardarMessage(){
    {
    
    
    let var2 = 
    {
    messageText:$("#messageText").val(),
    car:{idCar: +$("#Select-Car").val()},
    client:{idClient: +$("#Select-Client").val()},

    };
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://140.238.133.71:8080/api/Message/save",
       
        
        success:function(response) 
        {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}

function actualizarMessage(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messagetext").val(),
        skate:{id: +$("#select-skate").val()},
        client:{idClient: +$("#select-client").val()},

    


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){ 
            $("#messageText").val("");
            $("#Select-Client").val("");
            $("#Select-Car").val(""); //Algunos dice empty();
           
            autoInicioMessage();
            alert("se ha Actualizado correctamente el Mensaje")
        }
    });

}

function borrarMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            autoInicioMessage();
            alert("Se ha Eliminado el mensaje")
        }
    });

}