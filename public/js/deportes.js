$(document).ready(function () {
  getData();
});

function getData() {
  $("#cuerpo").html("");
  axios.get("/deportes").then((data) => {
    let deportes = data.data.deportes;
    deportes.forEach((d) => {
      $("#cuerpo").append(`
            <tr>
              <th scope="row">${d.id}</th>
              <td>${d.nombre}</td>
              <td>${d.precio}</td>
              <td>
                <button class="btn-edit" onclick='preEdit("${d.id}", "${d.nombre}", "${d.precio}")' data-toggle="modal" data-target="#exampleModal"><i class="fa-solid fa-square-pen"></i></button>
                <button class="btn-delete" onclick='eliminar("${d.id}")'><i class="fa-solid fa-square-minus"></i></button>
              </td>
            </tr>
          `);
    });
  });
}

function preEdit(id, nombre, precio) {
  $("#idModal").val(id);
  $("#nombreModal").val(nombre);
  $("#precioModal").val(precio);
}

function agregar() {
  let id = $("#id").val();
  let nombre = $("#nombre").val();
  let precio = $("#precio").val();
  axios.get(`/agregar?id=${id}&nombre=${nombre}&precio=${precio}`).then((data) => {
    alert(data.data);
    getData();
  });
  $("#exampleModal").modal("hide");
}

function edit() {
  let id = $("#idModal").val();
  let nombre = $("#nombreModal").val();
  let precio = $("#precioModal").val();
  axios.put(`/editar/${id}`, { nombre, precio }).then((data) => {
    alert(data.data);
    getData();
  }).catch(error => {
    console.error('Error al editar:', error);
  });  
  $("#exampleModal").modal("hide");
}

function eliminar(id) {
  axios.get(`/eliminar?id=${id}`).then((data) => {
    alert(data.data);
    getData();
  });
  $("#exampleModal").modal("hide");
}