
function relacionCar(){
    
    $.ajax({
        url:"http://140.238.133.71:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            let $select = $("#select-car");
            $.each(respuesta, function (idCar, name) {
                $select.append('<option value='+idCar.idCar+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


/**
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
 */


/** PINTAR TABLA */
function pintarRespuestaGama(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].cars+"</td>";
        myTable+="<td> <button onclick=' actualizarGama("+respuesta[i].idGama+")'>Actualizar</button>";
        myTable+="<td> <button onclick=' borrarGama("+respuesta[i].idGama+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoGama").html(myTable);
}

/** GET */
 function autoInicioGama(){
    console.log("se esta ejecutando tabla Gama")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaGama(respuesta);
        }
    
    });

}
/** POST */
function guardarGama(){
    let var2 = 
    {
        name:$("#GamaName").val(""),
        description:$("#GamaDescription").val(""),
        car:{idGama: $("#select-car").val("")},
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://140.238.133.71:8080/api/Gama/save",
              
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

/** PUT */
function actualizarGama(idElemento){
    let myData=
    {
        idGama:idElemento,
        name:$("#GamaName").val(),
        description:$("#GamaDescription").val(),
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
            $("#CarName").val("");
            $("#CarBrand").val("");
            autoInicioGama();
            alert("Se ha actualizado correctamente la gama")

        }

    });
}


/** DELETE */

function borrarGama(idElemento){
    let myData={
        id:idElemento,
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Gama/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){
            $("#resultadoGama").empty();
            autoInicioGama();
            alert("Se ha borrado correctamente la gama")
        }
    });
}  


