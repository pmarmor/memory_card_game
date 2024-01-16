
createInterface() //crea interfaz
let cookie = document.getElementById("cookies");
let crono = '';  //cronómetro
let parejas = new Map();
let segundo = 0; //segundos del cronómetro
let counter = 0;//contador de cartas pulsadas
let carta1 = 0  //primera carta pulsada
let carta2 = 0  //Segunda carta pulsada
let correcto = 0  //Almacena las parejas encontradas
let intentos = 0    //Almacena los intentos
new Image().src ="pokemon.png";
/**
 * Crea la interfaz de inicio
 */
function createInterface() {
    let element = document.createElement("h2")
    element.innerText = "Juego de parejas"
    document.body.appendChild(element)
    element.setAttribute("id", "titulo")

    //
    element = document.createElement("input")
    element.setAttribute("type", "button")
    element.setAttribute("value", "")
    element.setAttribute("id", "boton")
    document.body.appendChild(element)
    document.getElementById("boton").addEventListener("click", createTable)
}
/**
 * Crea las parejas de las cartas
 */
function creaParejas() {
    parejas.clear()
    let cartas = ['cyndaquil.png', 'evee.png', 'pikachu.png', 'piplup.png', 'snivy.png', 'treecko.png', 'cyndaquil.png', 'evee.png', 'pikachu.png', 'piplup.png', 'snivy.png', 'treecko.png']
    while (parejas.size < 12) { 
        let num2 = Math.floor(Math.random() * (cartas.length - 1)) + 0;
        parejas.set(parejas.size, cartas[num2]);
        cartas.splice(num2, 1)

    }
    //Precarga de imágenes
    for (let i = 0; i < parejas.size; i++) {
        new Image().src = parejas.get(i);
        
    }
}
/**
 * Crea la tabla
 */
function createTable() { 
    creaParejas();
    element = document.createElement("div")
    element.setAttribute("id", "divTabla")
    document.body.appendChild(element)
    if (!document.getElementById("tabla")) {
        let tabla = document.createElement("table")
        tabla.setAttribute("id", "tabla");
        document.body.appendChild(tabla)
        let u = 0 //contador para asignar ids
        for (let i = 0; i < 3; i++) { //Crea Filas
            let fila = document.createElement("tr")
            tabla.appendChild(fila)
            for (let e = 0; e < 4; e++) { //Crea columnas
                let id = u
                u++
                let columna = document.createElement("td")
                let img = document.createElement("img")
                img.setAttribute("id", id);
                img.setAttribute("src", "pokemon.png")
                columna.appendChild(img)
                fila.appendChild(columna)

            }

        }
        document.getElementById("tabla").addEventListener("click", checkCarta)
        document.getElementById("boton").style.display = "none"
        document.getElementById("titulo").style.display = "none"
    }

    crono = setInterval(cronometro, 1000);
}

function cronometro() {
    segundo = segundo + 1;
    if (correcto == 6) {

        clearInterval(crono);
    }
}

/**
 * Comprueba las cartas y lleva a cabo todo lo relacionado al juego
 * @param {*} e 
 */
function checkCarta(e) {
    let id = e.target.id
    if (id == 'tabla') { id = null }
    document.getElementById(id).style.transition = 'all 0.4s';
    document.getElementById(id).style.transform = 'rotatey(90deg)'
    id = parseInt(id)

    let timeout = setTimeout(() => {

        if (parejas.has(parseInt(id))) {
            document.getElementById(id).src = parejas.get(id)
            document.getElementById(id).style.transition = 'all 0.7s';
            document.getElementById(id).style.transform = 'rotatey(0)'
            document.getElementById(id).style.transform = 'scale(0.95)'
            if (counter == 1) { carta2 = id }
            if (counter == 1) {
                if (document.getElementById(carta1).src == document.getElementById(carta2).src) {
                    carta1 = 0; carta2 = 0; counter = 0; correcto = correcto + 1
                }
                else {
                    document.getElementById("tabla").removeEventListener("click", checkCarta)
                    const myTimeout = setTimeout(() => {


                        document.getElementById(carta1).src = "pokemon.png"
                        document.getElementById(carta2).src = "pokemon.png"
                        document.getElementById("tabla").addEventListener("click", checkCarta)

                        resetStyles();
                        carta1 = 0; carta2 = 0; counter = 0
                    }, 1700);
                }
                intentos = intentos + 1
            }
            else if (counter == 0) { carta1 = id; counter = counter + 1 }


        }

        if (correcto == 6) {
            endGame()
        }
    }, 400);

}
/**
 * Elimina los estilos en línea asignados por el script para que así tenga en cuenta el archivo css
 */
function resetStyles() {
    let imgs = document.getElementsByTagName("img")
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.removeProperty('transition');
        imgs[i].style.removeProperty('transform');
    }
}
/**
 * Ejecuta las animaciones del final, muestra las estadísticas y asigna las cookies
 */
function endGame() {
    let textoAlert = '';
    let seconds = (2 * document.documentElement.clientWidth) / 1280
    document.getElementById("final").style.display = "flex"
    document.getElementById("fondoFinal").style.animationDuration = seconds + 's';
    document.getElementById("fondoFinal").style.transitionTimingFunction = 'ease-out';
    document.getElementById("tabla").style.transitionDelay = "1.5s"
    document.getElementById("tabla").style.opacity = "0"

    let score = { tiempo: segundo + 1, intentos: intentos, }
    let cookie = retriveCookie('score')
    cookie=JSON.parse(cookie.split('=')[1])

    if (typeof cookie == "undefined") {
        document.cookie = 'score=' + JSON.stringify(score);
        cookie = 0

    }
    try {/*
        cookie = retriveCookie('score')
        cookie = cookie.substring(6, cookie.length)
        cookie = JSON.parse(cookie);
*/
        setTimeout(() => {

            document.getElementById("contenido").style.opacity = '0'
            document.getElementById("finalH1").style.transition = '1s'
            document.getElementById("finalH1").style.opacity = '0'

            setTimeout(() => {
                console.log(cookie)
                document.getElementById("finalH1").style.display = 'none'
                document.getElementById("contenido").style.transition = '1s'
                document.getElementById("cookieTiempo").innerHTML = "Tiempo récord: " + cookie.tiempo
                document.getElementById("cookieIntentos").innerHTML = "Récord de intentos: " + cookie.intentos
                document.getElementById("scoreIntentos").style.marginTop = "100px"
                document.getElementById("scoreTiempo").innerHTML = "Tiempo : " + score.tiempo
                document.getElementById("scoreIntentos").innerHTML = "Intentos: " + score.intentos

                document.getElementById("contenido").style.opacity = '1'
                if (cookie.intentos > score.intentos) {
                    textoAlert = '¡Nuevo récord!\n'
                    document.cookie = 'score=' + JSON.stringify(score);
                    document.getElementById("crown").style.display = "block"
                    document.getElementById("crown").style.opacity = "1"

                }
                else if (cookie.tiempo > score.tiempo && cookie.intentos == score.intentos) {
                    textoAlert = '¡Nuevo récord!\n'
                    document.cookie = 'score=' + JSON.stringify(score);
                    document.getElementById("crown").style.display = "block"
                    document.getElementById("crown").style.opacity = "1"
                }
                else {
                    score = cookie
                }
                textoAlert = textoAlert + '¿Quieres volver a empezar?'
                setTimeout(() => {
                    if(confirm(textoAlert)){
                        location.reload()
                    }
                }, 4000)
            }, 800)
        }, 4100)

        console.log(score)
    } catch (error) {
        console.log('la cookie no existe todavía, por lo que acaba de crearse')
    }

}
function retriveCookie(name) {
    var name = name + '=';
    var cookies = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c
        }
    }
}
