
function autoInicioCar(){
    console.log("se esta ejecutando tabla Car")
    $.ajax({
        url:"http://140.238.133.71:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCar(respuesta);
            let $select = $("#Select-Car");
            $.each(respuesta, function (_id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}

function pintarRespuestaCar(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarCar("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCar("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCar").html(myTable);
}

function guardarCar()
{
    let var2 = 
    {
        name:$("#CarName").val(),
        brand:$("#CarBrand").val(),
        year:$("#CarYear").val(),
        description:$("#CarDescription").val(),
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://140.238.133.71:8080/api/Car/save",
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente el vehículo");
            alert("Se guardo correctamente el vehículo");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente el vehículo");
        }
    });
}



function actualizarCar(idElemento){
    let myData=
    {
        id:idElemento,
        name:$("#CarName").val(),
        brand:$("#CarBrand").val(),
        year:$("#CarYear").val(),
        description:$("#CarDescription").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Car/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#CarName").val("");
            $("#CarBrand").val("");
            $("#CarYear").val("");
            $("#CarDescription").val("");
            autoInicioCar();
            alert("Se ha actualizado correctamente el carro")

        }

    });
}

function borrarCar(idElemento){
    let myData={
        id:idElemento,
        name:$("#CarName").val(),
        brand:$("#CarBrand").val(),
        year:$("#CarYear").val(),
        description:$("#CarDescription").val(),

    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://140.238.133.71:8080/api/Car/delete",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){
            $("#resultadoCar").empty();
            autoInicioCar();
            alert("Se ha borrado correctamenteel carro")
        }
    });
}  
