
function autoInicioReservation(){
    console.log("se esta ejecutando tabla Reservation")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
            let $select = $("#select-Reservation");
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
        myTable+="<td>"+respuesta[i].start+"</td>";
        myTable+="<td>"+respuesta[i].end+"</td>";
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
        star:$("#Reservationstart").val(),
        end:$("#Reservationend").val(),
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

