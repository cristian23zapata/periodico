let local = window.localStorage;

let modalElement = document.getElementById('miModal');
let modalInstance = new bootstrap.Modal(modalElement);
let container = document.getElementById('container');

function nuevaReceta() {
    modalInstance.show();
}

function cancelar() {
    modalInstance.hide();
}

function guardar() {
    let numero = document.getElementById('numero').value;
    let nombreReceta = document.getElementById('nombreReceta').value;
    let descripcion = document.getElementById('descripcion').value;
    let costo = document.getElementById('costo').value;
    let precioSugerido = document.getElementById('precioSugerido').value;
    let subirImagen = document.getElementById('subirImagen').files[0];

    if (!numero || !nombreReceta || !descripcion || isNaN(costo) || isNaN(precioSugerido)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let imagenURL = event.target.result;
    
    let receta = {
        numero,
        nombreReceta,
        descripcion,
        costo,
        precioSugerido,
        imagen: imagenURL,
    };

    let recetas = JSON.parse(local.getItem('recetas')) || [];
    recetas.push(receta);
    local.setItem('recetas', JSON.stringify(recetas));

    renderRecetas();

    document.getElementById('numero').value = '';
    document.getElementById('nombreReceta').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('precioSugerido').value = '';
    document.getElementById('subirImagen').value = '';

    cancelar();
    };
    reader.readAsDataURL(subirImagen);
}

function renderRecetas() {
    container.innerHTML = '';

    let recetas = JSON.parse(local.getItem('recetas')) || [];

    recetas.forEach((receta) => {
        let card = `
            <div class="card mb-3" style="max-width: 1540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${receta.imagen}" class="img-fluid rounded-start" alt="Imagen de la receta">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${receta.nombreReceta} // Número consecutivo: ${receta.numero}</h5>
                            <p class="card-text">${receta.descripcion}</p>
                            <p class="card-text"><small class="text-body-secondary">Costo: $${receta.costo}</small></p>
                            <p class="card-text"><small class="text-body-secondary">Precio sugerido: $${receta.precioSugerido}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderRecetas();
});


