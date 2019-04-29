let expect = chai.expect; 

//Clase Restaurante
describe('Instanciar restaurantes, reservas y puntuación', function(){
	it('Se agrega correctamente el restaurante "Paisano" ',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.nombre).to.equal("Paisano");
    })

	it('Al reservar el horario "12:00", este se elimina del arreglo',function(){
		let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);		
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
        /*expect(listado.obtC()).to.be.an('array');*/
        expect(listado.obtC()).to.be.an('array').to.eql(["Berlín", "Londres", "Nueva York", "París", "Roma"]);
    })

    it('Obtener sin repetir todos los rubros de restaurantes',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        /*expect(listado.obtR()).to.be.an('array');*/
        expect(listado.obtR()).to.be.an('array').to.eql(["Asiática", "Desayuno", "Ensalada", "Hamburguesa", "Pasta", "Pizza"]);
    })

    it('Obtener sin repetir todas los horarios',function(){    	
        let listado = new Listado(listadoDeRestaurantes);
        /*expect(listado.obtH()).to.be.an('array');*/
        expect(listado.obtH()).to.be.an('array').to.eql(["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "19:00", "19:30", "20:30", "21:00", "21:30", "22:30"]);
    })

})

//Filtros de restaurantes
describe('Filtros de restaurantes', function(){
	it('Filtra correctamente restaurantes por rubro "Desayuno" ',function(){
		let restaurante1 = new Restaurant(1, "Rest1", "Pasta", "Arg", ["12:00", "17:30"], "img/pasta1.jpg", [8, 4, 7]);
		let restaurante2 = new Restaurant(2, "Rest2", "Desayuno", "Per", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
		let restaurante3 = new Restaurant(3, "Rest3", "Pizza", "Ita", ["13:00", "20:30"], "img/pasta2.jpg", [7, 4, 7]);
        let listadoPrueba = [restaurante1, restaurante2, restaurante3];
        let restoElegido = [listadoPrueba[1]]
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
        let restoElegido = [listadoPrueba[0]]
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
        let restoElegido = [listadoPrueba[1],listadoPrueba[2]]
        let listado = new Listado(listadoPrueba);
        let app = new Aplicacion(listado);
        let horario="13:00";
        let restFiltrado=app.listado.obtenerRestaurantes(null,null,horario);
        // console.log(restFiltrado);
        expect(restFiltrado).to.be.eql(restoElegido);
    })

})