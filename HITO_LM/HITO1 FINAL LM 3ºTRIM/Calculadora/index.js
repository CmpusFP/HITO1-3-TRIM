document.addEventListener('DOMContentLoaded', function() {
    const displayValorAnterior = document.getElementById('valor-anterior');
    const displayValorActual = document.getElementById('valor-actual');
    const botonesNumeros = document.querySelectorAll('.numero');
    const botonesOperadores = document.querySelectorAll('.operador');
    const botonBorrarTodo = document.querySelector('.borrar-todo');
    const botonBorrar = document.querySelector('.borrar');

    const display = new Display(displayValorAnterior, displayValorActual);

    botonesNumeros.forEach(boton => {
        boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
    });

    botonesOperadores.forEach(boton => {
        boton.addEventListener('click', () => display.computar(boton.value));
    });

    botonBorrarTodo.addEventListener('click', () => display.borrarTodo());
    botonBorrar.addEventListener('click', () => display.borrar());
});
