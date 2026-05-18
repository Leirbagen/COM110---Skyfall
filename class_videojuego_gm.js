class Cielo{
    static getCanvas(){
        var canvas = document.getElementById("contenedor")
        return canvas
    }
    static getContexto(){
        var ctx = Cielo.getCanvas().getContext("2d")
        return ctx
    }
    constructor(objetoBase){
        this.x = objetoBase.x
        this.y = objetoBase.y
    }
    getX(){return this.x}
    getY(){return this.y}
    setX(nuevaX){this.x = nuevaX}
    setY(nuevaY){this.y = nuevaY}
    iniciarJuego(){
        var pantallaInicio = document.getElementById("pantallaInicio")
        var canvas = document.getElementById("contenedor")
        var puntaje = document.getElementById("contenedorPuntaje")
        pantallaInicio.style.display = "none" //ocultar pantalla de inicio
        canvas.style.display= "block" //mostrar canvas del juego
        puntaje.style.display= "block" //mostrar bloque de puntaje
        return 1
    }
}
class Figuras extends Cielo{
    constructor(objetoFiguras){
        super(objetoFiguras)
        this.base = objetoFiguras.base
        this.altura = objetoFiguras.altura
        this.radio = objetoFiguras.radio
        this.velocidad = objetoFiguras.velocidad
        this.color = objetoFiguras.color
        this.min = objetoFiguras.min
        this.max = objetoFiguras.max
        this.minBase = objetoFiguras.minBase
        this.maxBase = objetoFiguras.maxBase
        this.minAltura = objetoFiguras.minAltura
        this.maxAltura = objetoFiguras.maxAltura
        this.puntaje = document.querySelector("puntaje")
        this.tipo = objetoFiguras.tipo
    }
    getBase(){return this.base}
    getAltura(){return this.altura}
    getRadio(){return this.radio}
    getColor(){return this.color}
    getVelocidad(){return this.velocidad}
    getMin(){return this.min}
    getMax(){return this.max}
    getMinBase(){return this.minBase}
    getMaxBase(){return this.maxBase}
    getMinAltura(){return this.minAltura}
    getMaxAltura(){return this.maxAltura}
    getPuntaje(){return parseInt(this.puntaje.textContent)}
    getTipo(){return this.tipo}
    setTipo(nuevoTipo){this.tipo = nuevoTipo}
    setBase(nuevaBase){this.base = nuevaBase}
    setAltura(nuevaAltura){this.altura = nuevaAltura}
    setVelocidad(nuevaVelocidad){this.velocidad = nuevaVelocidad}
    setPuntaje(nuevoPuntaje){this.puntaje.textContent = nuevoPuntaje}
    renderizar(){
        if(this.getTipo() == "enemigo"){ //comprueba cual a cual de los dos metodos va a llamar, a los enemigos o a los bloques que se estan iterando automaticamente
            this.renderizarEnemigo()
        }
        else{
            this.renderizarRectangulos()
        }
    }
    renderizarRectangulos(){
        Cielo.getContexto().fillStyle = this.getColor()
        Cielo.getContexto().fillRect(this.getX(), this.getY(), this.getBase(), this.getAltura())
    }
    renderizarEnemigo(){
        Cielo.getContexto().clearRect(this.getX() + 15, this.getY(), this.getBase(), this.getAltura())
        var img = new Image()
        img.src = "Materiales/pajaro_arriba.png"
        var x = this.getX()
        var y = this.getY()
        img.onload= function(){
            Cielo.getContexto().drawImage(img,x,y)
        }   
    }
    movimientoAutomatico(){
        Cielo.getContexto().clearRect(this.getX() + 15, this.getY(), this.getBase(), this.getAltura())
        if(this.getX() + this.getBase() >= 0){
            this.setX(this.getX()-this.getVelocidad())
        }
        else{
            this.regenerarRectangulosAfuera()
        }
        this.renderizar()
    }
    coordenadasAleatoriasenX(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random()*(min-max)+ max)
        
    }
    coordenadasAleatoriasenY(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random()* (min-max) + max)
    }
    nuevaBase(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random()*(min-max) + max)
    }
    nuevaAltura(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random()*(min-max) + max)
    }
    regenerarRectangulosAfuera(){
        var coordenadax = this.coordenadasAleatoriasenX(Cielo.getCanvas().width, Cielo.getCanvas().width + 60)
        var coordenaday = this.coordenadasAleatoriasenY(this.getMin(), this.getMax()-60)
        this.setX(coordenadax)
        this.setY(coordenaday)
        if(this.getPuntaje() >= 30){
            var baseActualizada = this.nuevaBase(this.getMinBase(), this.getMaxBase())
            var alturaActualizada = this.nuevaAltura(this.getMinAltura(), this.getMaxBase())
            this.setBase(baseActualizada)
            this.setAltura(alturaActualizada)
        }
    }
}
class Jugador extends Figuras{
    constructor(objeto_jugador){
        super(objeto_jugador)
        this.velocidadX = objeto_jugador.velocidadX
        this.fuerzaSalto = objeto_jugador.fuerzaSalto
        this.gravedad = objeto_jugador.gravedad
        this.estadoSalto = 0
        this.Vy = 0
        this.interruptor = 1
        this.sentido = 1
        this.sentido2 = 1
        this.condicion = 0
        this.estadoPerder = 0
        this.musica = 1
        this.imagen = 0
        this.audio = new Audio("Materiales/honored_one.wav")   //definiendo el audio como un atributo que contiene el audio
    }
    getFuerzaSalto(){return this.fuerzaSalto}
    getGravedad(){return this.gravedad}
    getEstadoSalto(){return this.estadoSalto}
    getVy(){return this.Vy}
    getVelocidadenX(){return this.velocidadX}
    getInterruptor(){return this.interruptor}
    getCondicion(){return this.condicion}
    getPerder(){return this.estadoPerder}
    getMusica(){return this.musica}
    getestadoImagen(){return this.imagen}
    getAudio(){return this.audio}
    getSentido(){return this.sentido}
    getSentido2(){return this.sentido2}
    setEstadoSalto(nuevoEstado){this.estadoSalto = nuevoEstado}
    setVy(nuevaVarianza){this.Vy = nuevaVarianza}
    setVelocidadenX(nuevaVelocidadx){this.velocidadX = nuevaVelocidadx}
    setInterruptor(nuevoValor){this.interruptor = nuevoValor}
    setCondicion(nuevaCondicion){this.condicion = nuevaCondicion}
    setEstadoPerder(nuevoEstadoperder){this.estadoPerder = nuevoEstadoperder}
    setMusica(nuevoEstadoMusica){this.musica = nuevoEstadoMusica}
    setestadoImagen(nuevoeImagen){this.imagen = nuevoeImagen}
    setSentido(nuevoSentido){this.sentido = nuevoSentido}
    setSentido2(nuevosentido2){this.sentido2 = nuevosentido2}
    renderizarJugador(){
        if(this.getestadoImagen() == 0){ // si esta sobre una colision
            var img = new Image
            var x = this.getX() - this.getRadio()
            var y = this.getY() - this.getRadio()
            img.onload= function(){
                Cielo.getContexto().drawImage(img,x,y)
            }
            if(this.getSentido() == 0){ // si es 0, izquierda
                img.src = "Materiales/gojo_parado1.png"
            }
            else{
                img.src= "Materiales/gojo_parado2.png"
            }
        }
        else{ //si esta saltando
            var img = new Image
            var x = this.getX() - this.getRadio()
            var y = this.getY() - this.getRadio()
            img.onload= function(){
                Cielo.getContexto().drawImage(img,x,y)
            }
            if(this.getSentido2() == 0){ //si es 0, izquierda
                img.src = "Materiales/gojo_saltando.png"
            }
            else{
                img.src = "Materiales/gojo_saltando2.png"
            }
        }
    }
    borrarse(){
        Cielo.getContexto().clearRect(this.getX()-this.getRadio()-10, this.getY() - this.getRadio()-10, 2*this.getRadio()+15, 2*this.getRadio()+15) //aumentando un poco el rango de borrado para tratar de evitar residuos de imagen
    }
    moverse(sentido){
        if(this.getPerder() == 0){ 
            if(sentido == 65 || sentido == 68 || sentido == 37 || sentido == 39){
                if(sentido == 65 || sentido == 37){
                    this.setSentido(0) //mirando a la izquierda
                    if((this.getX() - this.getRadio() <= 0)){
                        this.setEstadoPerder(1)
                    }
                    else{
                        this.borrarse()
                        this.setX(this.getX()-this.getVelocidadenX())
                        this.renderizarJugador()
                    } 
                }
                else{
                    this.setSentido(1) //mirando a la derecha
                    if((this.getX() + this.getRadio() >= Cielo.getCanvas().width)){
                        this.setEstadoPerder(1)
                    }
                    else{
                        this.borrarse()
                        this.setX(this.getX()+this.getVelocidadenX())
                        this.renderizarJugador()
                    }
                }
            }
        }
    }
    saltar(objeto1, objeto2, objeto3, objeto4, objeto5, objeto6, objeto7, objeto8){
        if(this.getPerder() == 0){
            if(this.getSentido() == 1){ //imagen derecha
                this.setSentido2(1)
                this.setestadoImagen(1)
                this.renderizarJugador()
                if(this.getInterruptor() == 1){ //sirve para verificar que el personaje se encuentra en una colision, por lo tanto tiene permitido saltar
                    this.setInterruptor(0)
                    if (this.getEstadoSalto() == 0) { 
                        var sonido = new Audio("Materiales/salto.wav")
                        sonido.play()
                        this.setVy(this.getFuerzaSalto())
                        let huboAlgunaColision =  (this.detectarColisionAbajo(objeto1) || this.detectarColisionAbajo(objeto2)|| this.detectarColisionAbajo(objeto3) || this.detectarColisionAbajo(objeto4) || this.detectarColisionAbajo(objeto5)|| this.detectarColisionAbajo(objeto6)|| this.detectarColisionAbajo(objeto7)|| this.detectarColisionAbajo(objeto8))
                        if(huboAlgunaColision == 1){
                            this.setPuntaje(this.getPuntaje() + 5)
                            this.setCondicion(1) 
                            setTimeout(() => {                
                                this.setCondicion(0) 
                            }, 100);
                        }
                    }            
                }
            }else{ //imagen izquierda
                this.setSentido2(0)
                this.setestadoImagen(1)
                this.renderizarJugador()
                if(this.getInterruptor() == 1){ //sirve para verificar que el personaje se encuentra en una colision, por lo tanto tiene permitido saltar
                    this.setInterruptor(0)
                    if (this.getEstadoSalto() == 0) { 
                        var sonido = new Audio("Materiales/salto.wav")
                        sonido.play()
                        this.setVy(this.getFuerzaSalto())
                        let huboAlgunaColision =  (this.detectarColisionAbajo(objeto1) || this.detectarColisionAbajo(objeto2)|| this.detectarColisionAbajo(objeto3) || this.detectarColisionAbajo(objeto4) || this.detectarColisionAbajo(objeto5)|| this.detectarColisionAbajo(objeto6)|| this.detectarColisionAbajo(objeto7)|| this.detectarColisionAbajo(objeto8))
                        if(huboAlgunaColision == 1){
                            this.setPuntaje(this.getPuntaje() + 5)
                            this.setCondicion(1) 
                            setTimeout(() => {                
                                this.setCondicion(0) 
                            }, 100);
                        }
                    }            
                }
            }
        }  
    }
    actualizarSalto(objeto1, objeto2, objeto3, objeto4, objeto5, objeto6, objeto7, objeto8) {
        if (this.getEstadoSalto() == 0){ 
            this.borrarse()           
            this.setVy(this.getVy() - this.getGravedad())
            this.setY(this.getY() - this.getVy())
            this.setY(this.getY() - this.getGravedad())
            this.renderizarJugador()
            this.caerAlVacio()
            let huboAlgunaColision =  (this.detectarColisionAbajo(objeto1) || this.detectarColisionAbajo(objeto2)|| this.detectarColisionAbajo(objeto3) || this.detectarColisionAbajo(objeto4) || this.detectarColisionAbajo(objeto5)|| this.detectarColisionAbajo(objeto6)|| this.detectarColisionAbajo(objeto7)|| this.detectarColisionAbajo(objeto8))           
            if(huboAlgunaColision == 1){
                this.setestadoImagen(0)
                this.renderizarJugador()
                this.setVy(0)// Permite que el objeto se detenga 
                this.setEstadoSalto(0)
                this.setInterruptor(1)
            }else{
                this.setInterruptor(0)
            }
        }
    }
    caerAlVacio(){
        if (this.getY() + this.getRadio() >= Cielo.getCanvas().height + this.getRadio()){ 
            this.setY(Cielo.getCanvas().height )
            this.setVy(0)// Permite que el objeto se detenga 
            this.setEstadoSalto(0)
            this.setEstadoPerder(1)
            this.setMusica(0)
        }
    }
    detectarColisionAbajo(rectangulo){
        var colisionAbajo = (this.getY() + this.getRadio() >= rectangulo.getY() && this.getY() + this.getRadio() <= rectangulo.getY()+ rectangulo.getAltura()) && (this.getX() >= rectangulo.getX() && this.getX() <= rectangulo.getX() + rectangulo.getBase())
        if (colisionAbajo == 1) {
            this.setY(rectangulo.getY() -  this.getRadio())
            return 1
        }else{
            return 0
        }
    }
    actualizarVelocidadesPuntaje(objeto1,objeto2,objeto3,objeto4,objeto5,objeto6,objeto7,objeto8,objetoEnemigo1,objetoEnemigo2){  
        if(this.getCondicion() == 1){ //permite que los objetos que se estan iterando puedan incrementar su velocidad de 1 en 1
            this.setVelocidadenX(this.getVelocidadenX() + 1)
            objeto1.setVelocidad(objeto1.getVelocidad() + 1)
            objeto2.setVelocidad(objeto2.getVelocidad() + 1)
            objeto3.setVelocidad(objeto3.getVelocidad() + 1)
            objeto4.setVelocidad(objeto4.getVelocidad() + 1)
            objeto5.setVelocidad(objeto5.getVelocidad() + 1)
            objeto6.setVelocidad(objeto6.getVelocidad() + 1)
            objeto7.setVelocidad(objeto7.getVelocidad() + 1)
            objeto8.setVelocidad(objeto8.getVelocidad() + 1)
            objetoEnemigo1.setVelocidad(objetoEnemigo1.getVelocidad() + 1)
            objetoEnemigo2.setVelocidad(objetoEnemigo2.getVelocidad() + 1)
        }
    }
    detectarColisionesEnemigo(rectangulo){
        let colisionAbajo = (this.getY() + this.getRadio() >= rectangulo.getY() && this.getY() + this.getRadio() <= rectangulo.getY()+ rectangulo.getAltura()) && (this.getX() >= rectangulo.getX() && this.getX() <= rectangulo.getX() + rectangulo.getBase())
        let colisionArriba = (this.getY() - this.getRadio() >= rectangulo.getY() && this.getY()-this.getRadio()  <= rectangulo.getY() + rectangulo .getAltura()) && (this.getX() >= rectangulo.getX() && this.getX() <= rectangulo.getX() + rectangulo.getBase())
        let colisionIzquierda = (this.getY() >= rectangulo.getY() && this.getY() <= rectangulo.getY() + rectangulo.getAltura()) && (this.getX() + this.getRadio() == rectangulo.getX())
        let colisionDerecha = (this.getY() >= rectangulo.getY() && this.getY() <= rectangulo.getY() + rectangulo.getAltura()) && (this.getX() - this.getRadio() == rectangulo.getX() + rectangulo.getBase())
        if( colisionAbajo == 1 || colisionArriba == 1 || colisionIzquierda == 1 || colisionDerecha == 1){
            this.setEstadoPerder(1)
            this.setMusica(0)
        }
    }
    musicaAmbiente(){
        if(this.getMusica() == 1 && this.getPerder() == 0){ //permite detectar que solo puedes reproducir la musica solo si estas vivo 
            this.getAudio().play()
        }
        else{
            this.getAudio().pause()
        }
    }
    perder(intervalo){
        if(this.getPerder() == 1){ //si estas muerto, automaticamente carga la imagen de perder y se reproduce el sonido de derrota
            var puntaje = document.getElementById("contenedorPuntaje")
            puntaje.style.display ="none"  //ocultar puntaje al morir
            clearInterval(intervalo) //limpia el intervalo para que los objetos no se sobrepongan a la imagen final
            this.musicaAmbiente() //vuelve a llamar al metodo para que la musica se deje de reproducir
            var pantallaMuerte = new Image()
            pantallaMuerte.src= "Materiales/finalprueba.jpg"
            pantallaMuerte.onload = function(){
                Cielo.getContexto().drawImage(pantallaMuerte, (Cielo.getCanvas().width - pantallaMuerte.width), (Cielo.getCanvas().height - pantallaMuerte.height))
            }
            let sonido = new Audio("Materiales/sonido_muerte.wav")
            sonido.play()
            this.setPuntaje(0)
            setTimeout(() => { 
                let sonido = new Audio("Materiales/gameover_sound.wav")
                sonido.play()
            }, 1400);
        }
    }
}
    
