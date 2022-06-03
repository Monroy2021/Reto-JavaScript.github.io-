
(function () {
    document.getElementById('txtNombre').focus();
})();

//declaracion de variables a su alcance 

let index = 0;
let correctas = [];
let preguntas = [];
let alternativas = [];
let rptas = [];
const tiempo = 10;
let countdownfunction;

function validarNombre() {
    let nombre = document.getElementById('txtNombre').value;
    if (nombre.length === 0) {
        alert('Por favor ingresa tu nombre');
        document.getElementById('txtNombre').focus();
    } else {
        bienvenida(nombre);
    }
}
// asignacion por nombres  por localizador (index.html)
function bienvenida(nombre) {

    mostrarDiv('categoria');

    let mensaje = `¡Bienvenida ${nombre}!`;
    document.getElementById('msgHola').innerHTML = mensaje;
    document.getElementById('pelicula').innerHTML = "PELICULA";
    document.getElementById('geografia').innerHTML = "GEOGRAFIA";
    document.getElementById('historia').innerHTML = "HISTORIA";
    document.getElementById('entretenimiento').innerHTML = "ENTRETENIMIENTO";
    document.getElementById('deportes').innerHTML = "DEPORTES";

}
// Creamos la funcion  donde cargamos las preguntar mediante la declaracion de variable let (titulo)
// generamos un if donde vamos a comparar segun la cateira con sus respectivas preguntas y respuesta.
function cargarPreguntasTipo(tipo) {

    let titulo = '';
    reiniciar();

    if (tipo === 'A') {
        preguntas = [
            "1.- ¿Cuál es el nombre de Ironman?",
            "2.- ¿Cómo se llama el burro de la película Shrek?",
            "3.- ¿Por qué película ganó Leonardo DiCaprio su primer Óscar?"
        ];

        alternativas = [
            ["Toño Centella", "Anthony García", "Tony Stark"],
            ["Juanito", "Burro", "Pepe"],
            ["Titanic", "Avatar", "El Renacido"]
        ];


        rptas = [
            2,
            1,
            2
        ];

        titulo = 'PELÍCULAS';

    } else if (tipo === 'B') {
        preguntas = [
            "1.- ¿Cuál es el rio mas largo del mundo?",
            "2.- ¿Cuál es la capital de Uruguay?",
            "3.- ¿Cómo se llama en nevado más alto del Perú?"
        ];

        alternativas = [
            ["Nilo", "Amazonas", "Rimac"],
            ["Asunción", "París", "Montevideo"],
            ["Aconcagua", "Huascarán", "Everest"]
        ];

        rptas = [
            0,
            2,
            1
        ];

        titulo = 'GEOGRAFÍA';

    } else if (tipo === 'C') {
        preguntas = [
            "1.- ¿En qué siglo termina la Edad Media?",
            "2.- ¿En qué año subió Bismarck al poder? ",
            "3.- ¿En qué siglo Europa conquistó Australia?"
        ];

        alternativas = [
            ["XV", "XIII", "XIV"],
            ["1871", "1862", "1921"],
            ["XVII", "XII", "XIV"]
        ];

        rptas = [
            0,
            2,
            1
        ];

        titulo = 'HISTORIA';
    } else if (tipo === 'D') {
        preguntas = [
            "1.- ¿Cuántos episodios tiene Gantz?",
            "2.- ¿Cuál es el personaje principal de Kaleidostar?",
            "3.- ¿Cuál es el personaje principal de Bleach?"
        ];

        alternativas = [
            ["26", "25", "30"],
            ["Nagasi", "Sora", "Rukia"],
            ["Byakuya", "Rukia", "Ichigo"]
        ];

        rptas = [
            0,
            1,
            2
        ];

        titulo = 'ENTRETENIEMINTO ';

    } else if (tipo === 'E') {
        preguntas = [
            "1.- ¿Cuánto dura un partido de fútbol?",
            "2.- ¿Cómo se llama la zona de hierba rasa donde está ubicado el hoyo en golf?",
            "3.- ¿De qué nacionalidad es el entrenador de fútbol Tata Martino?"
        ];

        alternativas = [
            ["75 Minutos", "45 Minutos", "90 Minutos"],
            ["Green", "Esplanada", "Campo"],
            ["Italia", "Argentina", "España"]
        ];

        rptas = [
            2,
            0,
            1
        ];

        titulo = 'DEPORTES';
    }




    document.getElementById('msgCategoria').innerHTML = titulo;
    mostrarDiv('jugar');
    cargarPreguntas(index);

}

function siguiente() {
    document.getElementById('divrpta').style.display = 'none';
    index++;
    clearInterval(countdownfunction);
    if (index <= preguntas.length - 1) {
        cargarPreguntas(index);
    }

    if (index === preguntas.length) {
        verResultados();
    }

}



function cargarPreguntas(indice) {

    document.getElementById('pregunta').innerHTML = preguntas[indice];
    let opciones = "";
    for (let j = 0; j < alternativas[indice].length; j++) {
        opciones += "<p>";
        opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta(" + j + ")' name='opc' >" + alternativas[indice][j] + "</label> ";
        opciones += "</p>";
    }

    document.getElementById('alternativas').innerHTML = opciones;

    iniciarTimer();

}

function iniciarTimer() {
    let trestante = tiempo;
    document.getElementById('timer').innerHTML = trestante;
    countdownfunction = setInterval(function () {
        trestante--;

        if (trestante === 0) {
            document.getElementById("timer").innerHTML = "X";
        } else if (trestante < 0) {
            trestante = tiempo;
            siguiente();
        } else {
            document.getElementById('timer').innerHTML = trestante;
        }
        console.log(trestante);


    }, 1000);


}
// En esta funcion  es donde se genera la rspuesta incorrecta clicleada por el participante. 
function checkRpta(rpta) {

    document.getElementById('divrpta').style.display = 'block';
    let mensaje = "RESPUESTA INCORRECTA :(";
    let color = 'red';


    if (rptas[index] === rpta) {
        mensaje = "RESPUESTA CORRECTA :)";
        correctas.push(index);
        color = 'green';
    }
    document.getElementById('divrpta').style.background = color;
    document.getElementById('divrpta').innerHTML = mensaje;
    deshabilitarRadios('radios');

}

function verResultados() {
    mostrarDiv('resultados');
    let template = '';
    let tempEstado = ''; 

    //preguntas=["1)-","2)-","3)-"] --> (i) 

    for (let i = 0; i < preguntas.length; i++) {
        template += '<p>';

        let estado = 'INCORRECTO';
        let classEstado = 'incorrecto'; 

        //correctas=[1,2] -->indice de preguntas(x)
        for (let x of correctas) {
            if (x === i) {
                estado = 'CORRECTO';
                classEstado = 'correcto';
                break;
            }
        }

        tempEstado += '<label class="' + classEstado + '">' + estado + '</label>';
        template += '<h3>' + preguntas[i] + ' ' + tempEstado + '</h3>';

        template += '</p>';
        tempEstado = '';
    }

    document.getElementById('divresultado').innerHTML = template;

}


function mostrarDiv(div) {
    let ocultos = document.getElementsByClassName('box');
    for (var i = 0, len = ocultos.length; i < len; i++) {
        ocultos[i].style.display = 'none'
    }
    document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
    let rds = document.getElementsByClassName(radios);
    for (var i = 0, len = rds.length; i < len; i++) {
        rds[i].disabled = true;
    }
}

function reiniciar() { 
    index = 0;
    correctas = [];
    preguntas = [];
    alternativas = [];
    rptas = [];
}
//recarga la pagina
function cerrarSesion() {
    window.location.reload();
}