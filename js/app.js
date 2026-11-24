
// ==========================================
// APRENDE Y MULTIPLICA
// ==========================================

const CLAVE_LOGROS = "aprendeMultiplicaLogros";

let preguntas = [];
let preguntaActual = 0;
let puntuacion = 0;
let respuestaBloqueada = false;


// ==========================================
// NAVEGACION PRINCIPAL
// ==========================================

function mostrarSeccion(seccion) {
    if (seccion === "aprender") {
        iniciarAprendizaje();
    } else if (seccion === "practicar") {
        mostrarMenuPractica();
    } else if (seccion === "logros") {
        mostrarLogros();
    }
}


// ==========================================
// APRENDER LAS TABLAS
// ==========================================

function mostrarTablas() {

    const contenido = document.getElementById("contenido");

    let botones = "";

    for (let i = 1; i <= 10; i++) {

        botones += `
            <button class="tabla-boton"
                onclick="seleccionarTabla(${i})">
                Tabla del ${i}
            </button>
        `;
    }

    contenido.innerHTML = `
        <h2>📚 Aprende las tablas</h2>
        <p>Selecciona la tabla que quieres estudiar.</p>

        <div class="tablas-grid">
            ${botones}
        </div>
    `;
}



function seleccionarTabla(numero) {

    const contenido = document.getElementById("contenido");

    let operaciones = "";

    for (let i = 1; i <= 10; i++) {

        operaciones += `
            <div class="operacion">
                <span>${numero} × ${i}</span>
                <strong>${numero * i}</strong>
            </div>
        `;
    }

    contenido.innerHTML = `
        <h2>🌟 Tabla del ${numero}</h2>

        <p>¡Vamos a aprender juntos!</p>

        <div class="lista-operaciones">
            ${operaciones}
        </div>

        <button class="volver-boton"
            onclick="iniciarAprendizaje(${numero})">
            🍎 Aprender con objetos
        </button>

        <button class="volver-boton boton-secundario"
            onclick="mostrarTablas()">
            ⬅ Volver a las tablas
        </button>
    `;
}


// ==========================================
// MENU DE PRACTICA
// ==========================================

function mostrarMenuPractica() {

    const contenido = document.getElementById("contenido");

    let botones = "";

    for (let i = 1; i <= 10; i++) {

        botones += `
            <button class="tabla-boton"
                onclick="iniciarJuego(${i})">
                Tabla del ${i}
            </button>
        `;
    }

    contenido.innerHTML = `
        <h2>🎮 ¡Vamos a practicar!</h2>

        <p>Elige una tabla o practica todas.</p>

        <button class="volver-boton"
            onclick="iniciarJuego(0)">
            🌟 Practicar todas las tablas
        </button>

        <div class="tablas-grid">
            ${botones}
        </div>
    `;
}


// ==========================================
// PREPARAR LAS PREGUNTAS
// ==========================================

function iniciarJuego(tabla) {

    preguntas = [];
    preguntaActual = 0;
    puntuacion = 0;
    respuestaBloqueada = false;

    for (let i = 1; i <= 10; i++) {

        if (tabla === 0) {

            const numero = Math.floor(Math.random() * 10) + 1;

            preguntas.push({
                numero: numero,
                multiplicador: i
            });

        } else {

            preguntas.push({
                numero: tabla,
                multiplicador: i
            });
        }
    }

    // Mezclar el orden de las preguntas

    preguntas.sort(() => Math.random() - 0.5);

    mostrarPregunta();
}


// ==========================================
// MOSTRAR UNA PREGUNTA
// ==========================================

function mostrarPregunta() {

    const contenido = document.getElementById("contenido");

    respuestaBloqueada = false;

    if (preguntaActual >= preguntas.length) {
        mostrarResultados();
        return;
    }

    const pregunta = preguntas[preguntaActual];

    const resultado = pregunta.numero * pregunta.multiplicador;

    const opciones = [resultado];

    while (opciones.length < 3) {

        const error = Math.floor(Math.random() * 90) + 1;

        if (!opciones.includes(error)) {
            opciones.push(error);
        }
    }

    opciones.sort(() => Math.random() - 0.5);

    let botones = "";

    opciones.forEach(opcion => {

        botones += `
            <button class="respuesta-boton"
                onclick="responderPregunta(${opcion})">
                ${opcion}
            </button>
        `;
    });

    contenido.innerHTML = `
        <h2>🧠 ¡Piensa y responde!</h2>

        <p>Pregunta ${preguntaActual + 1} de 10</p>

        <div class="progreso-juego">
            ⭐ ${puntuacion} estrellas
        </div>

        <div class="pregunta">
            ${pregunta.numero} × ${pregunta.multiplicador} = ?
        </div>

        <div class="respuestas-grid">
            ${botones}
        </div>

        <div id="retroalimentacion"></div>
    `;
}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function responderPregunta(respuesta) {

    if (respuestaBloqueada) return;

    respuestaBloqueada = true;

    const pregunta = preguntas[preguntaActual];

    const resultado = pregunta.numero * pregunta.multiplicador;

    const retroalimentacion =
        document.getElementById("retroalimentacion");

    if (respuesta === resultado) {

        puntuacion++;

        retroalimentacion.innerHTML = `
            <div class="respuesta-correcta">
                🎉 ¡Muy bien! ¡Respuesta correcta!
                <p>¡Ganaste una estrella!</p>
            </div>
        `;

    } else {

        retroalimentacion.innerHTML = `
            <div class="respuesta-incorrecta">
                💡 ¡Vamos a aprender!

                <p>
                    ${pregunta.numero} × ${pregunta.multiplicador}
                    = ${resultado}
                </p>

                <p>La respuesta correcta es ${resultado}.</p>
            </div>
        `;
    }

    document.querySelectorAll(".respuesta-boton")
        .forEach(boton => {
            boton.disabled = true;
        });

    const botonSiguiente = document.createElement("button");

    botonSiguiente.className = "volver-boton";

    botonSiguiente.textContent =
        preguntaActual === 9 ? "Ver resultados 🏆" : "Siguiente ➡";

    botonSiguiente.onclick = () => {

        preguntaActual++;

        mostrarPregunta();
    };

    retroalimentacion.appendChild(botonSiguiente);
}


// ==========================================
// GUARDAR Y MOSTRAR RESULTADOS
// ==========================================

function obtenerLogros() {

    try {

        return JSON.parse(
            localStorage.getItem(CLAVE_LOGROS)
        ) || {
            estrellas: 0,
            partidas: 0,
            aciertos: 0
        };

    } catch (error) {

        return {
            estrellas: 0,
            partidas: 0,
            aciertos: 0
        };
    }
}


function guardarResultados() {

    const logros = obtenerLogros();

    logros.estrellas += puntuacion;
    logros.partidas++;
    logros.aciertos += puntuacion;

    localStorage.setItem(
        CLAVE_LOGROS,
        JSON.stringify(logros)
    );
}


function mostrarResultados() {

    guardarResultados();

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <h2>🏆 ¡Terminaste!</h2>

        <div class="resultado-final">
            <p>Obtuviste</p>

            <strong>⭐ ${puntuacion} de 10</strong>

            <p>
                ${puntuacion >= 8
                    ? "¡Excelente trabajo, campeón!"
                    : "¡Buen esfuerzo! Sigue practicando."}
            </p>
        </div>

        <button class="volver-boton"
            onclick="mostrarMenuPractica()">
            🔄 Volver a practicar
        </button>
    `;
}


// ==========================================
// MIS LOGROS
// ==========================================

function mostrarLogros() {

    const contenido = document.getElementById("contenido");

    const logros = obtenerLogros();

    contenido.innerHTML = `
        <h2>🏆 Mis logros</h2>

        <div class="resultado-final">

            <p>⭐ Estrellas acumuladas</p>
            <strong>${logros.estrellas}</strong>

            <p>🎮 Partidas terminadas</p>
            <strong>${logros.partidas}</strong>

            <p>✅ Respuestas correctas</p>
            <strong>${logros.aciertos}</strong>

        </div>

        <button class="volver-boton"
            onclick="mostrarMenuPractica()">
            ⬅ Volver
        </button>
    `;
}
