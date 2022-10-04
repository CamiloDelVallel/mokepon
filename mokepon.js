const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionMensajes = document.getElementById("resultado")

const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const spanMascotaJugador=document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const ataqueDelJugador = document.getElementById("ataques-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques=document.getElementById("contenedor-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

const anchoMaximoDelMapa = 600

const hipodoge_ataques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌿", id: "boton-tierra"},
]
const capipepo_ataques = [
    { nombre: "🌿", id: "boton-tierra"},
    { nombre: "🌿", id: "boton-tierra"},
    { nombre: "🌿", id: "boton-tierra"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
]
const ratigueya_ataques = [
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌿", id: "boton-tierra"},
    { nombre: "🌊", id: "boton-agua"},
]



let mokepones = []
let enemigoId= null
let mokeponesEnemigos =[]
let ataqueJugador = []
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones=[]
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./Imagenes/mokemap.webp"
let mascotaJugadorObjeto
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth * 0.6

alturaQueBuscamos = anchoDelMapa * 3/4 * 0.6
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


let victoriasJugador = 0
let victoriasEnemigo = 0

let jugadorId = null

if (anchoDelMapa>anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id=null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}


let hipodoge = new Mokepon("Hipodoge", "/Imagenes/mokepons_mokepon_hipodoge_attack.webp", 5, "Imagenes/hipodoge.webp")
let capipepo = new Mokepon("Capipepo", "Imagenes/mokepons_mokepon_capipepo_attack.webp", 5, "Imagenes/capipepo.webp")
let ratigueya = new Mokepon("Ratigueya", "Imagenes/mokepons_mokepon_ratigueya_attack.webp", 5, "/Imagenes/ratigueya.webp")

hipodoge.ataques.push(...hipodoge_ataques)

capipepo.ataques.push(...capipepo_ataques)

ratigueya.ataques.push(...ratigueya_ataques)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones
    
    inputHipoge=document.getElementById("Hipodoge")
    inputCapipepo=document.getElementById("Capipepo")
    inputRatigueya=document.getElementById("Ratigueya")


    })

    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.26.6:8080/unirse")
        .then(function (res) {
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){

    if(inputHipoge.checked==true){
        spanMascotaJugador.innerHTML=inputHipoge.id
        mascotaJugador = inputHipoge.id
    } else if(inputCapipepo.checked==true){
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked==true){
        spanMascotaJugador.innerHTML=inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("No Elegiste nada")
        return
    }
    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()

}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.26.6:8080/mokepon/public/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon

    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua= document.getElementById("boton-agua")
    botonTierra= document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("Fuego")
                console.log(ataqueJugador)
                boton.style.background = "#000000"
                boton.disabled=true
            } else if(e.target.textContent === "🌊"){
                ataqueJugador.push("Agua")
                console.log(ataqueJugador)
                boton.style.background = "#000000"
                boton.disabled=true

            } else {
                ataqueJugador.push("Tierra")
                console.log(ataqueJugador)
                boton.style.background = "#000000"
                boton.disabled=true

            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://192.168.26.6:8080/mokepon/public/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.26.6:8080/mokepon/public/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            batalla()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)
    
    if(ataqueAleatorio==0 || ataqueAleatorio==1){
        ataqueEnemigo.push("Fuego")
    } else if (ataqueAleatorio==2 || ataqueAleatorio==3 ){
        ataqueEnemigo.push("Agua")
    } else {
        ataqueEnemigo.push("Tierra")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        batalla()
    }
    else {
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function batalla(){
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i]==ataqueEnemigo[i]){
            indexAmbosOponentes(i, i)
            crearMensaje()
        } else if((ataqueJugador[i]=="Fuego" && ataqueEnemigo[i]=="Tierra")||(ataqueJugador[i]=="Agua" && ataqueEnemigo[i]=="Fuego")||(ataqueJugador[i]=="Tierra" && ataqueEnemigo[i]=="Agua")){
            indexAmbosOponentes(i, i)
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje()
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }
        revisarVidas()
    }
}

function revisarVidas(){
    if(victoriasEnemigo>victoriasJugador){
       crearMensajeFinal("Lo siento, perdiste")
    } else if(victoriasEnemigo<victoriasJugador){
        crearMensajeFinal("Ganaste, felicitaciones")
    } 
    else{
        crearMensajeFinal("Empataste")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "flex"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor((Math.random() * (max-min+1) + min))
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        console.log(mokepon, mokepones)
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}

function enviarPosicion(x, y){
    fetch(`http://192.168.26.6:8080/mokepon/public/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre==="Hipodoge"){
                            mokeponEnemigo = new Mokepon("Hipodoge", "/Imagenes/mokepons_mokepon_hipodoge_attack.webp", 5, "/Imagenes/hipodoge.webp", enemigo.id, anchoDelMapa*0.3, alturaQueBuscamos*0.8)
                        } else if (mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon("Capipepo", "/Imagenes/mokepons_mokepon_capipepo_attack.webp", 5, "/Imagenes/capipepo.webp", enemigo.id, anchoDelMapa*0.7, alturaQueBuscamos*0.65)
                        } else if (mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepon("Ratigueya", "/Imagenes/mokepons_mokepon_ratigueya_attack.webp", 5, "/Imagenes/ratigueya.webp", enemigo.id, anchoDelMapa*0.75, alturaQueBuscamos*0.4)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo

                    })


                })
        }
    })

}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = + 15
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = - 15
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = + 15
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = - 15
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
    

}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener("load",iniciarJuego)