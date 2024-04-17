let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let aciertos = 0;
let temporizador = false;
let startTime = null;
let elapsedTime = 0;
let mejorTiempo = localStorage.getItem('mejorTiempo');

let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('iniciaTiempo');
let mostrarMejorTiempo = document.getElementById('mejorTiempo');
let reset=document.getElementById('resetButton');

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
numeros.sort(() => Math.random() - 0.5);

function destapar(id) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    if (tarjetasDestapadas === 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.textContent = primerResultado;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.textContent = segundoResultado;
        tarjeta2.disabled = true;
        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.textContent = `Aciertos: ${aciertos}`;

            if (aciertos === 10) {
                detenerTiempo();
                guardarMejorTiempo();
            }
        } else {
            // No coinciden las tarjetas
            setTimeout(() => {
                tarjeta1.textContent = '';
                tarjeta2.textContent = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 1500);
        }
    }
}

// Función para contar el tiempo transcurrido
function contarTiempo() {
    startTime = setInterval(() => {
        elapsedTime++;
        mostrarTiempo.textContent = `Tiempo: ${elapsedTime} seg`;
    }, 1000);
}

function detenerTiempo() {
    clearInterval(startTime);
}
function guardarMejorTiempo() {
    // Convertir mejorTiempo a un número entero utilizando parseInt
    let bestTime = parseInt(mejorTiempo);

    if (!bestTime || elapsedTime < bestTime) {
        let iniciales = prompt('¡Nuevo récord! Ingresa tus iniciales (máximo 3 caracteres):');
        localStorage.setItem('mejorTiempo', elapsedTime);
        localStorage.setItem('iniciales', iniciales ? iniciales.slice(0, 3) : '');
        mostrarMejorTiempo.textContent = `Mejor tiempo: ${elapsedTime} seg (${localStorage.getItem('iniciales') || '-'})`;
    }
}
function reiniciarJuego() {
    location.reload();
}

mostrarMejorTiempo.textContent = `Mejor tiempo: ${mejorTiempo} seg (${localStorage.getItem('iniciales') || '-'})`;
