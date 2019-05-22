// creación de la clase reserva
let Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}

	// devuelve un string con el día de la semana, según el objeto horario que es de tipo Date
Reserva.prototype.diaSemana = function(horario) {
	let dias=["domingo", "lunnes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    let dt = new Date(horario);
    return dias[dt.getUTCDay()];
}

   // Devuelve monto adicional si el horario se encuentra entre 13 y 14 o entre 20 y 21, sinó devuelve 0
Reserva.prototype.adicionalPorHorario = function() {
	let hora=this.horario.getHours();
	let adicional=0;
	if (hora>=13 && hora<14 || hora>=20 && hora<21) {
		adicional=this.calcularPrecioBase()*0.05;
	}
	return adicional;	  
}

   // Devuelve monto adicional si día de la semana es viernes, sábado o domingo, sinó devuelve 0 
Reserva.prototype.adicionalPorFinSemana = function() {
	let dia=this.diaSemana(this.horario);
	let adicional=0;
	if (dia==="viernes"||dia=== "sabado" || dia=== "domingo") {
		adicional=this.calcularPrecioBase()*0.10;
	}
	return adicional;
}

   // Suma el total de adicionales entre los metodos adicional por horario y adicional por fin de semana
Reserva.prototype.calcularAdicionales = function() {
	let adicionales=this.adicionalPorHorario()+this.adicionalPorFinSemana();
	return adicionales; 
}

   //calcula descuento por cantidad, si cantidad es menor al número minimo para el descuento devuelve 0
Reserva.prototype.calcularDtoPorCant = function() {
	let cantPersonas=this.cantidadPersonas;
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
	return descuento;
}

   // Calcula por código, si el código no existe, devuelde 0
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
			/*
			// alerta que se puede usar luego que se implemente la clase reserva
			swal({
		        title: "Codigo incorrecto",
                text: "No se realizará descuento",
                icon: "error",
                button: "Continuar",
		    });
		    */
	}
	return descuento;
}

   // Suma lo que devuelde el metodo calcular por descuento y calcular por cantidad
Reserva.prototype.calcularDescuento = function() {	
	let descuento=this.calcularDtoPorCodigo()+this.calcularDtoPorCant();
	return descuento; 
}

	// Calcula el precio de cantidad de personas por precio sin aplicar descuentos o adicionales
Reserva.prototype.calcularPrecioBase = function() {
	let precioBase=this.precioPersona*this.cantidadPersonas;
	return precioBase;   
}

	// Devuelve el precio total sumando adicionales y restando descuentos
Reserva.prototype.precioTotalReserva = function() {
	let precio_base=this.calcularPrecioBase();
	let adicionales=this.calcularAdicionales();
	let descuentos=this.calcularDescuento()
	let precioFinal=precio_base+adicionales-descuentos;
	return precioFinal;   
}

/*
var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

console.log(reserva1);
console.log(this.reserva1.precioTotalReserva());
console.log(reserva2);
console.log(this.reserva2.precioTotalReserva());
*/