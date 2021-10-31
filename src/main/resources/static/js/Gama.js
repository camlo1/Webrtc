
function autoInicioGama(){
    console.log("se esta ejecutando tabla Gama")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGama(respuesta);
            let $select = $("#select-gama");
            $.each(respuesta, function (_id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}

function pintarRespuestaGama(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarGama("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarGama("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoGama").html(myTable);
}

function guardarGama()
{
    let var2 = 
    {
        name:$("#GamaName").val(),
        description:$("#GamaDescription").val(),
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
