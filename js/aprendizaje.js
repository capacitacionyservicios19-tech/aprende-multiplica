
// ==========================================
// APRENDE Y MULTIPLICA
// MODULO DE APRENDIZAJE VISUAL
// ==========================================

let tablaActual = 3;
let grupos = 1;
let objetosPorGrupo = 3;
let objetoActual = "🍎";

// ==========================================
// INICIAR APRENDIZAJE
// ==========================================

function iniciarAprendizaje(tabla = 3) {

    tablaActual = Math.max(1, Math.min(10, tabla));

    grupos = 1;
    objetosPorGrupo = tablaActual;
    objetoActual = "🍎";

    mostrarLeccionVisual();
}

// ==========================================
// MOSTRAR LECCION
// ==========================================

function mostrarLeccionVisual() {

    const contenido = document.getElementById("contenido");

    let gruposHTML = "";

    // Crear grupos y objetos

    for (let i = 1; i <= grupos; i++) {

        let objetosHTML = "";

        for (let j = 0; j < objetosPorGrupo; j++) {

            objetosHTML += `
                <span class="objeto-animado">
                    ${objetoActual}
                </span>
            `;
        }

        gruposHTML += `
            <div class="grupo-visual">

                <span class="nombre-grupo">
                    Grupo ${i}
                </span>

                <div class="objetos-grupo">
                    ${objetosHTML}
                </div>

            </div>
        `;
    }

    // Calcular suma y multiplicación

    const suma = Array(grupos)
        .fill(objetosPorGrupo)
        .join(" + ");

    const total = grupos * objetosPorGrupo;

    // Crear los 10 botones de tablas

    let opcionesTablas = "";

    for (let i = 1; i <= 10; i++) {

        opcionesTablas += `
            <button
                class="tabla-boton"
                style="${
                    i === tablaActual
                    ? 'background-color: #2563eb; color: white;'
                    : ''
                }"
                onclick="iniciarAprendizaje(${i})">

                Tabla del ${i}

            </button>
        `;
    }

    // Mostrar contenido

    contenido.innerHTML = `

        <div class="leccion-visual">

            <h2>🦉 ¡Aprendamos a multiplicar!</h2>

            <div class="mensaje-buho">

                🦉 ¡Hola, explorador!

                <p>
                    Estamos aprendiendo la tabla del
                    ${tablaActual}.
                </p>

                <p>
                    Vamos por la operación ${grupos} de 10.
                </p>

                Tenemos ${grupos} grupos y cada grupo
                tiene ${objetosPorGrupo} manzanas.

                <p>
                    Contemos juntos:
                    ${suma} = ${total}.
                </p>

                ¡Multiplicar es sumar grupos iguales!

            </div>

            <h3>📚 Elige tu tabla</h3>

            <div class="tablas-grid">
                ${opcionesTablas}
            </div>

            <h3>🍎 Nuestra colección</h3>

            <div class="grupos-visual">
                ${gruposHTML}
            </div>

            <div class="explicacion-visual">

                <h3>🧠 ¡Contemos juntos!</h3>

                <p>
                    Tenemos ${grupos} grupos con
                    ${objetosPorGrupo} objetos cada uno.
                </p>

                <div class="suma-visual">
                    ${suma} = ${total}
                </div>

                <div class="multiplicacion-visual">
                    ${objetosPorGrupo} × ${grupos} = ${total}
                </div>

                <p>
                    Multiplicar es sumar la misma cantidad
                    varias veces.
                </p>

            </div>

            <button class="volver-boton"
                onclick="mostrarPreguntaVisual()">

                🎯 Comprobar operación ${grupos}

            </button>

            <button class="volver-boton boton-secundario"
                onclick="mostrarTablas()">

                ⬅ Volver a las tablas

            </button>

        </div>
    `;
}

// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPreguntaVisual() {

    const contenido = document.getElementById("contenido");

    const respuestaCorrecta = grupos * objetosPorGrupo;

    const opciones = [respuestaCorrecta];

    while (opciones.length < 3) {

        const error = Math.floor(Math.random() * 100) + 1;

        if (!opciones.includes(error)) {
            opciones.push(error);
        }
    }

    opciones.sort(() => Math.random() - 0.5);

    let botones = "";

    opciones.forEach(opcion => {

        botones += `
            <button class="respuesta-boton"
                onclick="comprobarPreguntaVisual(${opcion})">

                ${opcion}

            </button>
        `;
    });

    // Mostrar pregunta

    contenido.innerHTML = `

        <div class="leccion-visual">

            <h2>🎯 ¡Ahora te toca!</h2>

            <div class="mensaje-buho">

                🦉 Tabla del ${tablaActual}

                <p>
                    Operación ${grupos} de 10.
                </p>

                <p>
                    Si tenemos ${grupos} grupos
                    con ${objetosPorGrupo} objetos cada uno,
                    ¿cuántos objetos tenemos en total?
                </p>

            </div>

            <div class="grupos-visual">

                ${Array(grupos).fill(`
                    <div class="grupo-visual">

                        <div class="objetos-grupo">
                            ${Array(objetosPorGrupo)
                                .fill(objetoActual)
                                .join(" ")}
                        </div>

                    </div>
                `).join("")}

            </div>

            <div class="respuestas-grid">
                ${botones}
            </div>

            <div id="resultado-visual"></div>

        </div>
    `;
}

// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarPreguntaVisual(respuesta) {

    const resultado =
        document.getElementById("resultado-visual");

    const total = grupos * objetosPorGrupo;

    const suma = Array(grupos)
        .fill(objetosPorGrupo)
        .join(" + ");

    document.querySelectorAll(".respuesta-boton")
        .forEach(boton => {
            boton.disabled = true;
        });

    if (respuesta === total) {

        resultado.innerHTML = `

            <div class="respuesta-correcta">

                🎉 ¡Excelente, explorador!

                <p>
                    ¡Tu respuesta es correcta!
                </p>

                <p>
                    ${suma} = ${total}
                </p>

                <p>
                    ${objetosPorGrupo} × ${grupos} = ${total}
                </p>

                ¡Has comprendido esta operación!

            </div>
        `;

        const boton = document.createElement("button");

        boton.className = "volver-boton";

        if (grupos < 10) {

            boton.textContent =
                "➡ Continuar a la siguiente operación";

            boton.onclick = avanzarOperacionVisual;

        } else {

            boton.textContent =
                "🏆 ¡Terminar la tabla!";

            boton.onclick = finalizarTablaVisual;
        }

        resultado.appendChild(boton);

    } else {

        resultado.innerHTML = `

            <div class="respuesta-incorrecta">

                🦉 ¡No te preocupes! Vamos a aprender.

                <p>
                    Primero sumamos los objetos de cada grupo:
                </p>

                <p>
                    ${suma} = ${total}
                </p>

                <p>
                    Por eso:
                    ${objetosPorGrupo} × ${grupos} = ${total}.
                </p>

                ¡Inténtalo otra vez!

            </div>
        `;

        const boton = document.createElement("button");

        boton.className = "volver-boton";

        boton.textContent = "🎯 Intentar otra vez";

        boton.onclick = mostrarPreguntaVisual;

        resultado.appendChild(boton);
    }
}

// ==========================================
// AVANZAR A LA SIGUIENTE OPERACION
// ==========================================

function avanzarOperacionVisual() {

    if (grupos >= 10) {
        finalizarTablaVisual();
        return;
    }

    grupos++;

    mostrarLeccionVisual();
}

// ==========================================
// FINALIZAR TABLA
// ==========================================

function finalizarTablaVisual() {

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `

        <div class="leccion-visual">

            <h2>🏆 ¡Lo lograste, explorador!</h2>

            <div class="mensaje-buho">

                🦉 ¡Felicidades!

                <p>
                    Has completado las 10 operaciones
                    de la tabla del ${tablaActual}.
                </p>

                <p>
                    ¡Ya puedes seguir aprendiendo
                    otras tablas!
                </p>

            </div>

            <button class="volver-boton"
                onclick="mostrarTablas()">

                📚 Elegir otra tabla

            </button>

        </div>
    `;
}
