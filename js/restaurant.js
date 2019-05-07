var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    /*for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios.splice(i, 1);
            return;
        }
    }*/
    // REFACTORIZADO
    var horarioFiltrado= this.horarios.filter(function(horario){
        return horario!=horarioReservado;    
    });
    this.horarios=horarioFiltrado;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}
// MODULARIZADO SUMATORIA y REFACTORIZADA
Restaurant.prototype.sumatoria = function(numeros) {
    var sumatoria = 0;
        /*for (var i = 0; i < this.calificaciones.length; i++) {
            sumatoria += this.calificaciones[i]
        }*/
        numeros.forEach(function(numero){
            sumatoria+=numero;
        });
    return sumatoria;
}
// MODULARIZADO PROMEDIO
Restaurant.prototype.promedio = function(suma, numeros) {
    return suma/numeros.length;
}
// BLOQUE MODULARIZADO CON FUNCIONES PROMEDIO Y SUMATORIA
Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        let suma = this.sumatoria(this.calificaciones);
        let media=this.promedio(suma, this.calificaciones);        
        return Math.round(media * 10) / 10;
    }

}

