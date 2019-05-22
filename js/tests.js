
let expect = chai.expect;

//Clase Restaurante
describe('Instanciar restaurantes, reservas y puntuación', function(){
	it('Restaurante se agrega correctamente',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.nombre).to.equal("Paisano");
    })

})

// Reserva restaurante
describe('Reservación de Restaurantes', function(){
	it('Al reservar un horario del restaurante, este se elimina del arreglo',function(){
		let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["11:00", "12:00", "13:00"], "../img/asado.jpg", [7,8]);		
		restaurante.reservarHorario("12:00");
        expect(restaurante.reservarHorario("12:00")).to.equal(undefined);
    })

    it('Al reservar un horario que no está, el arreglo se mantiene igual',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["11:00", "12:00", "13:00"], "../img/asado.jpg", [7,8]);       
        restaurante.reservarHorario("14:00");
        expect(restaurante.horarios).to.eql(["11:00", "12:00", "13:00"]);
    })

    it('Al reservar un horario sin parametros, el arreglo se mantiene igual',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["11:00", "12:00", "13:00"], "../img/asado.jpg", [7,8]);       
        restaurante.reservarHorario();
        expect(restaurante.horarios).to.eql(["11:00", "12:00", "13:00"]);
    })

});

// Obtener puntuación
describe('Obtener puntuación de Restaurante', function(){

    it('Obtener puntuación "7.5" de restarurantes con calificaciones de "[7,8]" ',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.obtenerPuntuacion()).to.equal(7.5);
    });

    it('Obtener puntuación "0" de restarurantes sin calificaciones',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", []);
        expect(restaurante.obtenerPuntuacion()).to.equal(0);
    });

});

// Calificación de restaurante
describe('Calificación de Restaurante', function(){
    it('Calificar Restaurante con número "7" ',function(){
    	let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [8]);
        restaurante.calificar(7);
        expect(restaurante.calificaciones).to.eql([8,7]);
    });
});

// Clase Listado
describe('Busqueda de  Restaurantes por Id', function(){
	it('Se busca restaurante por id existente "1"',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let restoBuscado=listado.buscarRestaurante(1);
        expect(restoBuscado.id).to.equal(1);
    })

    it('Se busca restaurante por id inexistente "26" ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let restoBuscado=listado.buscarRestaurante(26);
        expect(restoBuscado.id).to.equal(undefined);
    })
})

// Clase Listado
describe('Obtención de listas sin repetir', function(){

    it('Ciudades donde hay un restaurante',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        let listaCiudades=["Berlín", "Londres", "Nueva York", "París", "Roma"];
        expect(listado.obtenerUbicaciones()).to.be.an('array').to.eql(listaCiudades);
    })

    it('Rubros de los restaurantes',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        let listaRubros=["Asiática", "Desayuno", "Ensalada", "Hamburguesa", "Pasta", "Pizza"];
        expect(listado.obtenerRubros()).to.be.an('array').to.eql(listaRubros);
    })

    it('Horarios de los restaurantes',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        let listaHorarios=["11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
         "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
          "18:00", "19:00", "19:30", "20:30", "21:00", "21:30", "22:30"]; 
        expect(listado.obtenerHorarios()).to.be.an('array').to.eql(listaHorarios);
    })

})

// Clase Restaurant
describe('Obtención de restaurantes por rubros', function(){
	it('Filtra correctamente restaurantes por rubro "Desayuno" ',function(){
		let restaurante1 = new Restaurant(1, "Rest1", "Pasta", "Arg", ["12:00", "17:30"], "img/pasta1.jpg", [8, 4, 7]);
		let restaurante2 = new Restaurant(2, "Rest2", "Desayuno", "Per", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
		let restaurante3 = new Restaurant(3, "Rest3", "Pizza", "Ita", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
        let listadoPrueba = [restaurante1, restaurante2, restaurante3];
        let restoElegido = [listadoPrueba[1]];
        let listado = new Listado(listadoPrueba);
        let app = new Aplicacion(listado);
        let rubro="Desayuno";
        let restFiltrado=app.listado.obtenerRestaurantes(rubro,null,null);
        expect(restFiltrado).to.be.eql(restoElegido);
    })

    it('Filtra correctamente restaurantes por ciudad "Arg" ',function(){
        let restaurante1 = new Restaurant(1, "Rest1", "Pasta", "Arg", ["12:00", "17:30"], "img/pasta1.jpg", [8, 4, 7]);
		let restaurante2 = new Restaurant(2, "Rest2", "Desayuno", "Per", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
		let restaurante3 = new Restaurant(3, "Rest3", "Pizza", "Ita", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
        let listadoPrueba = [restaurante1, restaurante2, restaurante3];
        let restoElegido = [listadoPrueba[0]];
        let listado = new Listado(listadoPrueba);
        let app = new Aplicacion(listado);
        let ciudad="Arg";
        let restFiltrado=app.listado.obtenerRestaurantes(null,ciudad,null);
        expect(restFiltrado).to.be.eql(restoElegido);
    })

    it('Filtra correctamente restaurantes por horario "13:00" ',function(){
        let restaurante1 = new Restaurant(1, "Rest1", "Pasta", "Arg", ["12:00", "17:30"], "img/pasta1.jpg", [8, 4, 7]);
		let restaurante2 = new Restaurant(2, "Rest2", "Desayuno", "Per", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
		let restaurante3 = new Restaurant(3, "Rest3", "Pizza", "Ita", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
        let listadoPrueba = [restaurante1, restaurante2, restaurante3];        
        let listado = new Listado(listadoPrueba);
        let restoElegido = [listadoPrueba[1],listadoPrueba[2]];
        let app = new Aplicacion(listado);
        let horario="13:00";
        let restFiltrado=app.listado.obtenerRestaurantes(null,null,horario);
        expect(restFiltrado).to.be.eql(restoElegido);
    })

});

// Clase Reserva
describe('Funcionalidades de reserva', function(){
	it('Crear reserva "Reserva1"',function(){
		let date= new Date(2018, 7, 24, 11, 00);
		let reserva1 = new Reserva (date, 8, 350, "DES1");
		let control  = {
			horario : date,
    		cantidadPersonas : 8,
    		precioPersona : 350,
    		codigoDescuento : "DES1"
		};
        expect(reserva1.horario).to.be.equal(control.horario);
        expect(reserva1.cantidadPersonas).to.be.equal(control.cantidadPersonas);
        expect(reserva1.precioPersona).to.be.equal(control.precioPersona);
        expect(reserva1.codigoDescuento).to.be.equal(control.codigoDescuento);
    });

    it('Calcular precio base "2 personas a $150 c/u"',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva1 = new Reserva (date, 2, 150, "DES200");
        let control  = {
            horario : date,
            cantidadPersonas : 2,
            precioPersona : 150,
            codigoDescuento : "DES200"
        };
        let precioBase=control.cantidadPersonas*control.precioPersona;        
        expect(reserva1.calcularPrecioBase()).to.be.equal(precioBase);        
    })
});

// Adicionales Reserva
describe('Calculo de Adicionales', function(){
    it('Calcular Adicionales por horario pico "13:00 hs"',function(){
        let date= new Date(2018, 7, 31, 13, 00);
        let reserva1 = new Reserva (date, 2, 150, "DES200");
        let control  = {
            horario : date,
            cantidadPersonas : 2,
            precioPersona : 150,
        };
        let precioBase=control.cantidadPersonas*control.precioPersona;
        let adicionalPorHorario=precioBase*0.05;               
        expect(reserva1.adicionalPorHorario()).to.be.equal(adicionalPorHorario);                
    });    
    it('Calculo de Adicionales por fin de semana',function(){
        let date= new Date(2018, 7, 31, 13, 00);
        let reserva1 = new Reserva (date, 2, 150, "DES200");
        let control  = {
            horario : date,
            cantidadPersonas : 2,
            precioPersona : 150,
        };
        let precioBase=control.cantidadPersonas*control.precioPersona;        
        let adicionalPorFinSemana=precioBase*0.10;       
        expect(reserva1.adicionalPorFinSemana()).to.be.equal(adicionalPorFinSemana);        
    });
});

// Adicional total de reserva
describe('Total de Adicional de reserva', function(){
    it('Calcular total de Adicionales',function(){
        let date= new Date(2018, 7, 31, 13, 00);
        let reserva1 = new Reserva (date, 2, 150, "DES200");
        let control  = {
            horario : date,
            cantidadPersonas : 2,
            precioPersona : 150,
        };
        let precioBase=control.cantidadPersonas*control.precioPersona;
        let adicionalPorHorario=precioBase*0.05;        
        let adicionalPorFinSemana=precioBase*0.10;
        let sumaAdicionales=adicionalPorHorario+adicionalPorFinSemana;
        expect(reserva1.calcularAdicionales()).to.be.equal(sumaAdicionales);        
    });
});

// Descuentos por código
describe('Calcular descuentos por código', function(){
    it('Calcular descuento por código "DES15"',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva = new Reserva (date, 2, 150, "DES15"); //45
        
        let control= [2,150,0.15];
        let descuento15=(control[0]*control[1])*control[2]; //45              
        expect(reserva.calcularDtoPorCodigo()).to.be.equal(descuento15);        
    });
    it('Calcular descuento por código "DES200"',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva = new Reserva (date, 2, 150, "DES200");//200
        
        let descuento200=200; //200
        expect(reserva.calcularDtoPorCodigo()).to.be.equal(descuento200);       
    });
    it('Calcular descuento por código "DES1"',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva = new Reserva (date, 2, 150, "DES1");//150

        let control= [2,150,0.15];
        let descuento1=control[1];//150
        expect(reserva.calcularDtoPorCodigo()).to.be.equal(descuento1);        
    });
    it('Calcular descuento por código Incorrecto',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva1 = new Reserva (date, 2, 150, "DES15355");             
        expect(reserva1.calcularDtoPorCodigo()).to.be.equal(0);                
    });
});

// Descuentos por cantidad
describe('Calcular descuento por cantidad de personas', function(){
    // Descuentos por cantidad de personas
    it('Calcular descuento por 3 de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva = new Reserva (date, 3, 100, "DES15");            
        expect(reserva.calcularDtoPorCant()).to.be.equal(0);             
    });

    it('Calcular descuento por 4 de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva1 = new Reserva (date, 4, 100, "DES15");
        let dto1=(reserva1.cantidadPersonas*reserva1.precioPersona)*0.05;
        expect(reserva1.calcularDtoPorCant()).to.be.equal(dto1);             
    });

    it('Calcular descuento por 6 de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva2 = new Reserva (date, 6, 100, "DES15");
        let dto2=(reserva2.cantidadPersonas*reserva2.precioPersona)*0.05;
        expect(reserva2.calcularDtoPorCant()).to.be.equal(dto2);             
    });

    it('Calcular descuento por 7 de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva3 = new Reserva (date, 7, 100, "DES15");
        let dto3=(reserva3.cantidadPersonas*reserva3.precioPersona)*0.10;
        expect(reserva3.calcularDtoPorCant()).to.be.equal(dto3);             
    });

    it('Calcular descuento por 8 de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva4 = new Reserva (date, 8, 100, "DES15");
        let dto4=(reserva4.cantidadPersonas*reserva4.precioPersona)*0.10;
        expect(reserva4.calcularDtoPorCant()).to.be.equal(dto4);             
    });

    it('Calcular descuento por 9 de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva5 = new Reserva (date, 9, 100, "DES15");
        let dto5=(reserva5.cantidadPersonas*reserva5.precioPersona)*0.15;
        expect(reserva5.calcularDtoPorCant()).to.be.equal(dto5);             
    });
});

// Descuento total de reserva
describe('Descuento de reserva', function(){ 

    it('Calcular descuento total',function(){
        let date= new Date(2018, 7, 24, 11, 00);
        let reserva1 = new Reserva (date,4, 100, "DES200");            
        expect(reserva1.calcularDescuento()).to.be.equal(220);             
    });
});
// Precio total de reserva
describe('Precio final de reserva', function(){
    it('Calcular precio total correcto de "Reserva1"',function(){
        let reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");

        expect(reserva1.precioTotalReserva()).to.be.equal(2450);
    });

    it('Calcular precio total correcto de "Reserva2"',function(){        
        let reserva2 = new Reserva (new Date(2018, 7, 27, 14, 00), 2, 150, "DES200");

        expect(reserva2.precioTotalReserva()).to.be.equal(100);
    });
});