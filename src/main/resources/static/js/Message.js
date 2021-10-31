
function autoInicioMessage(){
    console.log("se esta ejecutando tabla Message")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
            let $select = $("#select-Message");
            $.each(respuesta, function (_id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}

function pintarRespuestaMessage(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].texto+"</td>";
        myTable+="<td> <button onclick=' actualizarMessage("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
}

function guardarMessage()
{
    let var2 = 
    {
        texto:$("#Comentary").val(),        
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
            console.log("Se guardo correctamente la Message");
            alert("Se guardo correctamente la Message");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la Message");
        }
    });
}
