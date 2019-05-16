// creación de la clase reserva

let Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    //this.hora= this.horario.getHours();
    //this.minutos=this.horario.getMinutes();
    //this.dia=this.horario.getUTCDay();
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;

}


Reserva.prototype.diaSemana = function(horario) {
	var dias=["domingo", "lunnes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    var dt = new Date(horario);    
    console.log(dt.getUTCDay());
    console.log("diaSemana "+dias[dt.getUTCDay()]);
    return dias[dt.getUTCDay()];
}


Reserva.prototype.adicionalPorHorario = function() {
	let hora=this.horario.getHours();
	console.log("Hora dentro de adicionalPorHorario "+hora)
	let adicional=0;
	if (hora>=13 && hora<14 || hora>=20 && hora<21) {
		adicional=this.calcularPrecioBase()*0.05;
	}
	console.log(adicional);
	return adicional;	  
}


Reserva.prototype.adicionalPorFinSemana = function() {
	let dia=this.diaSemana(this.horario);
	let adicional=0;
	console.log("Acá el día dentro de adicional por semana "+dia);
	if (dia==="viernes"||dia=== "sabado" || dia=== "domingo") {
		adicional=this.calcularPrecioBase()*0.10;
	}
	console.log("Adicional por ser viernes "+adicional);
	return adicional;
}


Reserva.prototype.calcularAdicionales = function() {
	let adicionales=this.adicionalPorHorario()+this.adicionalPorFinSemana();
	return adicionales; 
}


Reserva.prototype.calcularDtoPorCant = function() {
	let cantPersonas=this.cantidadPersonas;
	console.log("calcularDtoPorcant : "+cantPersonas);
	let descuento=0
	if (cantPersonas>=4 && cantPersonas<=6) {
		descuento=this.calcularPrecioBase()*0.05;
	}else if (cantPersonas>=7 && cantPersonas<=8) {
		descuento=this.calcularPrecioBase()*0.10;
	}else if (cantPersonas>=9) {
		descuento=this.calcularPrecioBase()*0.15;
	}
	else{
		console.log("No hay descuento por cantidad");
		descuento=0
	}
	console.log(descuento);
	return descuento;
}


Reserva.prototype.calcularDtoPorCodigo = function() {
	let codigo=this.codigoDescuento;
	let cod=codigo.toUpperCase(); //toLowerCase()
	let descuento=0;
	switch(cod){
		case "DES15":
			descuento=this.calcularPrecioBase()*0.15;
		break;
		case "DES200":
			descuento=200;
		break;
		case "DES1":
			descuento=this.precioPersona;
		break;
		default:
			console.log("Codigo incorrecto, vuelva a intentar");
			//alert("Codigo incorrecto, vuelva a intentar");
	}
	return descuento;
}


Reserva.prototype.calcularDescuento = function() {	
	let descuento=this.calcularDtoPorCodigo()+this.calcularDtoPorCant();
	console.log("calcularDescuento: "+ descuento);
	return descuento; 
}


Reserva.prototype.calcularPrecioBase = function() {
	let precioBase=this.precioPersona*this.cantidadPersonas;
	console.log("calcularPrecioBase: "+ precioBase)
	return precioBase;   
}


Reserva.prototype.precioTotalReserva = function() {
	let precio_base=this.calcularPrecioBase();
	let adicionales=this.calcularAdicionales();
	let descuentos=this.calcularDescuento()
	let precioFinal=precio_base+adicionales-descuentos;
	return precioFinal;   
}

// https://www.acamica.com/clases/10555/reservando-final/reservando-guia-3
// https://www.acamica.com/clases/10490/refactoring/foreach-filter-map-y-mas
/*
var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

console.log(reserva1);
console.log(this.reserva1.precioTotalReserva());
console.log(reserva2);
console.log(this.reserva2.precioTotalReserva());
*/