let expect = chai.expect; 

//Clase Restaurante
describe('Instanciar restaurantes, reservas y puntuación', function(){
	it('Se agrega correctamente el restaurante PAISANO ',function(){
        let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.nombre).to.equal("Paisano");
    })

	it('Al reservar un horario, este se elimina del arreglo',function(){
		let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);		
		restaurante.reservarHorario("12:00");
        expect(restaurante.reservarHorario("12:00")).to.equal(undefined);
    })

    it('Calificar Restaurante',function(){
    	let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [8]);
        restaurante.calificar(7);
        expect(restaurante.calificaciones).to.eql([8,7]);
    })

    it('Obtener puntuación',function(){
    	let restaurante = new Restaurant(25, "Paisano", "Parrilla", "Argentina", ["12:00"], "../img/asado.jpg", [7,8]);
        expect(restaurante.obtenerPuntuacion()).to.equal(7.5);
    })

})

//Clase Listado
describe('Filtrar listado de Restaurantes', function(){
	it('Se busca restaurante por su id ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let restoBuscado=listado.buscarRestaurante(1);
        expect(restoBuscado.id).to.equal(1);
    })

    it('Se busca restaurante por id inexistente',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let restoBuscado=listado.buscarRestaurante(26);
        expect(restoBuscado.id).to.equal(undefined);
    })

    it('Obtener sin repetir todas las ciudades donde hay un restaurante',function(){    	
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
	it('Filtra correctamente restaurantes por rubro ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let rubro="Desayuno";
        expect(listado.obtenerRestaurantes(rubro, undefined, undefined)).to.be.an('array');
    })

    it('Filtra correctamente restaurantes por ciudad ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let ciudad="Londres";
        expect(listado.obtenerRestaurantes(undefined, ciudad, undefined)).to.be.an('array');
    })

    it('Filtra correctamente restaurantes por horarios ',function(){
        let listado = new Listado(listadoDeRestaurantes);
        let horario="12:00";
        expect(listado.obtenerRestaurantes(undefined, undefined, horario)).to.be.an('array');
    })

})