
let expect = chai.expect; 

//Clase Restaurante
describe('Instanciar restaurantes, reservas y puntuación', function(){
	it('Se agrega correctamente el restaurante "Paisano" ',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.nombre).to.equal("Paisano");
    })

	it('Al reservar el horario "12:00", este se elimina del arreglo',function(){
		let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["11:00", "12:00", "13:00"], "../img/asado.jpg", [7,8]);		
		restaurante.reservarHorario("12:00");
        expect(restaurante.reservarHorario("12:00")).to.equal(undefined);
    })

    it('Calificar Restaurante con número "7" ',function(){
    	let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [8]);
        restaurante.calificar(7);
        expect(restaurante.calificaciones).to.eql([8,7]);
    })

    it('Obtener puntuación "7.5" de restarurantes con calificaciones de "[7,8]" ',function(){
    	let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.obtenerPuntuacion()).to.equal(7.5);
    })

})

//Clase Listado
describe('Filtrar listado de Restaurantes', function(){
	it('Se busca restaurante por id "1" ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let restoBuscado=listado.buscarRestaurante(1);
        expect(restoBuscado.id).to.equal(1);
    })

    it('Se busca restaurante por id inexistente "26" ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let restoBuscado=listado.buscarRestaurante(26);
        expect(restoBuscado.id).to.equal(undefined);
    })

    it('Obtener sin repetir todas las ciudades donde hay un restaurante ["Berlín", "Londres", "Nueva York", "París", "Roma"] ',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        let listaCiudades=["Berlín", "Londres", "Nueva York", "París", "Roma"];
        expect(listado.obtenerUbicaciones()).to.be.an('array').to.eql(listaCiudades);
    })

    it('Obtener sin repetir todos los rubros de restaurantes',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        let listaRubros=["Asiática", "Desayuno", "Ensalada", "Hamburguesa", "Pasta", "Pizza"];
        expect(listado.obtenerRubros()).to.be.an('array').to.eql(listaRubros);
    })

    it('Obtener sin repetir todas los horarios',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        let listaHorarios=["11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
         "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
          "18:00", "19:00", "19:30", "20:30", "21:00", "21:30", "22:30"]; 
        expect(listado.obtenerHorarios()).to.be.an('array').to.eql(listaHorarios);
    })

})

//Filtros de restaurantes
describe('Filtros de restaurantes', function(){
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
        // console.log(restFiltrado);
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
        // console.log(restFiltrado);
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
        // console.log(restFiltrado);
        expect(restFiltrado).to.be.eql(restoElegido);
    })

});

// Reserva
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
    })
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

// Adicionales
describe('Calcular Adicionales', function(){
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
    it('Calcular Adicionales por fin de semana',function(){
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
    it('Suma total de Adicionales',function(){
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
describe('Calcular Descuentos', function(){
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
    // Descuentos por cantidad de personas
    it('Calcular descuento por cantidad de personas',function(){
        let date= new Date(2018, 7, 27, 14, 100);
        let reserva = new Reserva (date, 3, 100, "DES15");
        let reserva1 = new Reserva (date, 4, 100, "DES15");
        let reserva2 = new Reserva (date, 6, 100, "DES15");
        let reserva3 = new Reserva (date, 7, 100, "DES15");
        let reserva4 = new Reserva (date, 8, 100, "DES15");
        let reserva5 = new Reserva (date, 9, 100, "DES15");

        let dto1=(reserva1.cantidadPersonas*reserva1.precioPersona)*0.05;
        let dto2=(reserva2.cantidadPersonas*reserva2.precioPersona)*0.05; 
        let dto3=(reserva3.cantidadPersonas*reserva3.precioPersona)*0.10; 
        let dto4=(reserva4.cantidadPersonas*reserva4.precioPersona)*0.10;
        let dto5=(reserva5.cantidadPersonas*reserva5.precioPersona)*0.15;
        expect(reserva.calcularDtoPorCant()).to.be.equal(0);            
        expect(reserva1.calcularDtoPorCant()).to.be.equal(dto1);
        expect(reserva2.calcularDtoPorCant()).to.be.equal(dto2);
        expect(reserva3.calcularDtoPorCant()).to.be.equal(dto3);
        expect(reserva4.calcularDtoPorCant()).to.be.equal(dto4);
        expect(reserva5.calcularDtoPorCant()).to.be.equal(dto5);      
    })
    it('Calcular descuento total',function(){
        let date= new Date(2018, 7, 24, 11, 00);
        let reserva1 = new Reserva (date,4, 100, "DES200");            
        expect(reserva1.calcularDescuento()).to.be.equal(220);             
    });
});
// Precio total de reserva
describe('Precio de reserva', function(){
    it('Precio total correcto de "Reserva1" y "Reserva2"',function(){
        let reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        let reserva2 = new Reserva (new Date(2018, 7, 27, 14, 00), 2, 150, "DES200");

        expect(reserva1.precioTotalReserva()).to.be.equal(2450);
        expect(reserva2.precioTotalReserva()).to.be.equal(100);
    })
});