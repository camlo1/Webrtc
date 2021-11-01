
function autoInicioClient(){
    console.log("se esta ejecutando tabla Cliente")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
            let $select = $("#Select-Client");
            $.each(respuesta, function (_id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    
    })

}

function pintarRespuestaClient(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td> <button onclick=' actualizarClient("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarClient("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
}

function guardarClient()
{
    let var2 = 
    {
        name:$("#ClientName").val(),
        email:$("#ClientEmail").val(),
        age:$("#ClientAge").val(),
        password:$("#ClientPassword").val(),
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://140.238.133.71:8080/api/Client/save",
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente la Client");
            alert("Se guardo correctamente la Client");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente el Client");
        }
    });
}

/**
 * 
 * 
 * CRUD faltante
 */



 function actualizarClient(idElemento){
    let myData=
    {
        idClient:idElemento,
        name:$("#ClientName").val(),
        email:$("#ClientEmail").val(),
        age:$("#ClientAge").val(),
        password:$("#ClientPassword").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#ClientName").val("");
            $("#ClientEmail").val("");
            $("#ClientAge").val("");
            $("#ClientPassword").val("");
            autoInicioClient();
            alert("Se ha actualizado correctamente el client")

        }

    });
}

function borrarClient(idElemento){
    let myData={
        id:idElemento,
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            autoInicioClient();
            alert("Se ha borrado correctamente el client")
        }
    });
}  
