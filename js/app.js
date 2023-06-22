const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    // Cuando se agrega un curso al presionar el boton de "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        carritoHTML();
    });
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id');

        //Eliminar del arreglo articulosCarrito segun el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.ID !== cursoID); //Traer todos menos el que tenga el ID seleccionado
        
        carritoHTML(); //Actualizar carrito HTML iterando sobre el arreglo filtrado

    }
}

// Leer contenido HTML al que dimos click y extrae la info del curso
function leerDatosCurso(curso) {
    // Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        ID: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.ID === infoCurso.ID)
    if(existe) {
        // Actualizar la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.ID === infoCurso.ID) {
                curso.cantidad++;
                return curso; // Asignar el objeto actualizado al arreglo que crea map
            }
            else {
                return curso; // Retorna los objetos no duplicados ni modificados
            }
        });
        articulosCarrito = [...cursos]
    }
    else {
        // Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    console.log(articulosCarrito) 

    carritoHTML();
}

// Mostrar carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorrer carrito y generar HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, ID} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>

            <td>
                <a href="#" class="borrar-curso" data-id="${ID}" > X </a>
            </td>
        `;

        // Agregar HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del table body
function limpiarHTML() {
    // Forma Lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}