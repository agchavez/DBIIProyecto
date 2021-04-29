const sql = require('mssql');
var faker = require('faker');
const { random, datatype } = require('faker');

//SE llena la tabla Client
const Client = async( pool)=>{

    for(let i=0 ; i<400; i++){

        try {
            
            let first_name = faker.name.firstName(); 
            let last_name = faker.name.lastName(); 
            let phone = faker.phone.phoneNumber('########');
            let dni = String(faker.datatype.number());

            resp = await pool.request()
            .input('first_name', sql.Text, first_name)
            .input('last_name',sql.Text , last_name)
            .input('phone', sql.VarChar, phone)
            .input('dni', sql.VarChar, dni)

            .query("INSERT INTO Client(first_name, last_name, phone,dni) VALUES(@first_name, @last_name, @phone, @dni)")
          
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//SE llena la tabla Establishment
const Establishment  = async( pool)=>{

    for(let i=0 ; i<2; i++){

        try {

            let name = faker.company.companyName(); 
            let stateC = faker.random.word();
            let direction = faker.address.direction(); 
            let email = faker.internet.email(); 
            let id_city = i+1;

            resp = await pool.request()
            .input('name', sql.Text, name)
            .input('stateC', sql.Text, stateC)
            .input('direction', sql.Text, direction)
            .input('email', sql.Text, email)
            .input('id_city', sql.Int, id_city)
      
            .query("INSERT INTO Establishment(name, stateC, direction, email, id_city) VALUES(@name, @stateC, @direction, @email, @id_city)")
          
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//se Llena la tabla Movie
const MovieOltp = async( title,runtime,overview,homepage, pool)=>{
        
    try {
                            
        let img = faker.random.word(); 
        let id_classification = Math.floor(Math.random()*(4) + 1);

        resp = await pool.request()
        .input('name', sql.Text, title)
        .input('img', sql.Text, img)
        .input('description_movie', sql.Text, overview)
        .input('id_classification', sql.Int, id_classification)
        .input('duration', sql.Int, runtime)
        .input('url_trailer', sql.Text, homepage)
                    
        .query("INSERT INTO Movie(name, img, description_movie, id_classification, duration, url_trailer) VALUES(@name, @img, @description_movie, @id_classification, @duration, @url_trailer)")
                        
        console.log(resp);
                            
    } catch (error) {
        console.log(error);       
    }        
}

//se Llena la tabla TypeMovie
const TypeMovie = async( pool)=>{

    for(let i=0 ; i<200; i++){

        try {
            
            let id_movie = Math.floor(Math.random()*(200)+1); 
            let id_typeTec = Math.floor(Math.random()*(3)+1); 


            resp = await pool.request()
            .input('id_movie', sql.Int, id_movie)
            .input('id_typeTec',sql.Int , id_typeTec)

            .query("INSERT INTO TypeMovie(id_movie,id_typeTec) VALUES(@id_movie, @id_typeTec)")
          
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//En esta sección se prodria añadir paises aleatorios
//no se utilizaron porque se queria paises mas cercanos.
const Country  = async( pool)=>{

    for(let i=0 ; i<5; i++){

        try {
            
            let name = faker.address.countryCode(); 

            resp = await pool.request()
            .input('name', sql.Text, name)
      

            .query("INSERT INTO Country(name) VALUES(@name)")
          
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//Con este bloque se prodria añadir ciudades aleatorios
//no se utilizaron porque se queria datos mas reales.
const City  = async( pool)=>{

    for(let i=0 ; i<5; i++){

        try {
            
            let name = faker.address.city(); 
            let id_country = (Math.floor(Math.random()*6));

            resp = await pool.request()
            .input('name', sql.Text, name)
            .input('id_country', sql.Int, id_country)
      
            .query("INSERT INTO Country(name) VALUES(@name, @id_country)")
          
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//se Llena la tabla LivingRoom
const LivingRoom = async( pool) =>{
    
    for(let i=1 ; i<3; i++){

        for (let j=0 ; j<2; j++){
            try {
            
                let id_establishment = (i);
                let id_state = (10);
                let id_typeTec = (Math.floor(Math.random()*(3)+1));
                let number = (j+1);
    
                resp = await pool.request()
                .input('id_establishment', sql.Int, id_establishment)
                .input('id_state', sql.Int, id_state)
                .input('id_typeTec', sql.Int, id_typeTec)
                .input('number', sql.Int, number)
          
                .query("INSERT INTO LivingRoom(id_establishment, id_state, id_typeTec, number) VALUES(@id_establishment, @id_state, @id_typeTec, @number)")
              
                console.log(resp);
                
            } catch (error) {
                console.log(error);       
            }
        }   
    }
}

//se Llena la tabla PhoneEstablishment
const PhoneEstablishment  = async( pool)=>{

    for(let i=1 ; i<3; i++){

        try {
            
            let id_establishment = (i); 
            let phone = faker.phone.phoneNumber("########");
            let phone_description = "Establecimiento: " + i;

            resp = await pool.request()
            .input('id_establishment', sql.Int, id_establishment)
            .input('phone', sql.VarChar, phone)
            .input('phone_description', sql.Text, phone_description)
      
            .query("INSERT INTO PhoneEstablishment (id_establishment, phone, phone_description) VALUES(@id_establishment, @phone, @phone_description)")
          
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//Consulta de la variable duration 
const Durat = async(id_movie, pool)=>{
    
    resp = await pool.request()

    .input('id_movie', sql.Int, id_movie)

    .query("select duration from Movie where id = @id_movie");
    const duration = resp.recordset[0].duration

    return duration;
    
} 

//Llena tabla Billboard
const Billboard  = async( pool)=>{

    var inicio = new Date('2020-04-16 10:00:00');
    
    let end = new Date(inicio);

    for(let i=0 ; i<400; i++){
        
        try {
            
            let id_livingroom = Math.floor(Math.random()*(4)+1); 
            let id_movie = Math.floor(Math.random()*(200)+1);
            let duration = await Durat(id_movie, pool);

            const start_time = inicio;

            end.setMinutes(duration + end.getMinutes());
            const end_time = end;

            let date_billboard = faker.date.between("2020-05-16", "2020-06-16");
            let date_programming = faker.date.between("2020-06-16", "2020-07-16");
            let id_state = 6;
            
            resp = await pool.request()
            .input('id_livingroom', sql.Int, id_livingroom)
            .input('id_movie', sql.Int, id_movie)
            .input('start_time', sql.Time, start_time)
            .input('end_time', sql.Time, end_time)
            .input('date_billboard', sql.Date, date_billboard)
            .input('date_programming', sql.Date, date_programming)
            .input('id_state', sql.Int, id_state)

            .query("INSERT INTO Billboard(id_livingroom, id_movie, start_time, end_time, date_billboard, date_programming, id_state) VALUES(@id_livingroom, @id_movie, @start_time, @end_time, @date_billboard, @date_programming, @id_state)")
                      
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }
        
        inicio = new Date(end);
    }
}

//Llenar tabla Chair
const Chair = async( pool)=>{

    let number_chair = 0;

    for(let i=1 ; i<5; i++){

        try {
            for(let j =1; j < 11; j++){

                for(let d =1; d < 11; d++){
                    
                    let id_livingroom = i;
                    let id_state = 10;
                    let row_chair = j;
                    let column_chair = d;
                    number_chair = number_chair + 1;

                    resp = await pool.request()
                    .input('id_livingroom', sql.Int, id_livingroom)
                    .input('id_state', sql.Int, id_state)
                    .input('row_chair', sql.Int, row_chair)
                    .input('column_chair', sql.Int, column_chair)
                    .input('number_chair', sql.Int, number_chair)
            
                    .query("INSERT INTO Chair(id_livingroom, id_state, row_chair, column_chair, number_chair) VALUES(@id_livingroom, @id_state, @row_chair, @column_chair, @number_chair)")
                
                    console.log(resp);
                }
            }
            
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//Llenar tabla ticket
const Tikect = async( pool)=>{

    for(let i=1 ; i<100; i++){

        try {

            let id_billboard = Math.floor(Math.random()*(400)+1)
            let id_state = Math.floor(Math.random()*(9-7)+7);
            let code = faker.random.words();
            let describe = faker.random.word();
            let date_create = faker.date.between("2020-05-16", "2020-06-16");
            let date_exp = faker.date.between("2020-06-16", "2020-07-16");
            let discount = 100;

            resp = await pool.request()

            .input('id_billboard', sql.Int, id_billboard)
            .input('code', sql.VarChar, code)
            .input('id_state', sql.Int, id_state)
            .input('describe', sql.VarChar, describe)
            .input('date_create', sql.Date, date_create)
            .input('date_exp', sql.Date, date_exp)
            .input('discount', sql.Decimal, discount)
            
            .query("INSERT INTO Tikect(id_billboard, id_state, code, describe, date_create, date_exp, discount) VALUES(@id_billboard, @id_state, @code, @describe, @date_create, @date_exp, @discount)")
                
            console.log(resp);    
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

//obterner precio
const ObtPrice = async( pool, id_product)=>{

    resp = await pool.request()

    .input('id_product', sql.Int, id_product)

    .query("select price from Product where id = @id_product")
    const price = resp.recordset[0].price

    return price;
}

//Llenar tabla Invoice
const Invoice = async( pool)=>{

    for(let i=1 ; i<10000; i++){

        try {
                
            let id_billboard = Math.floor(Math.random()*(400)+1);
            let id_state = Math.floor(Math.random()*(9-7)+7);
            let id_ticket = Math.floor(Math.random()*(99)+1);
            let id_establishment = Math.floor(Math.random()*(2)+1);
            let id_typepay = Math.floor(Math.random()*(3)+1);
            let id_client = Math.floor(Math.random()*(300)+1);
            let id_product = Math.floor(Math.random()*(3)+1);
            let sub_total = await ObtPrice(pool, id_product);
            let tax_isv = (sub_total * 0.15);
            let total = (sub_total + tax_isv);
            let date_create = faker.date.between('2020-01-01', '2020-06-30');
            let rtn = '08011998004589'
            let kai = 'xxxxxxxxxxxxxx'

            resp = await pool.request()
            .input('id_billboard', sql.Int, id_billboard)
            .input('id_state', sql.Int, id_state)
            .input('id_ticket', sql.Int, id_ticket)
            .input('id_establishment', sql.Int, id_establishment)
            .input('id_typepay', sql.Int, id_typepay)
            .input('id_client', sql.Int, id_client)
            .input('id_product', sql.Int, id_product)
            .input('sub_total', sql.Decimal, sub_total)
            .input('tax_isv', sql.Decimal, tax_isv)
            .input('total', sql.Decimal, total)
            .input('date_create', sql.Date, date_create)
            .input('rtn', sql.VarChar, rtn)
            .input('kai', sql.VarChar, kai)

            .query("INSERT INTO Invoice(id_billboard, id_state, id_ticket, id_establishment, sub_total, tax_isv, total, id_typepay, date_create, id_client, RTN,Kai, id_product)  VALUES(@id_billboard, @id_state, @id_ticket, @id_establishment, @sub_total, @tax_isv, @total, @id_typepay, @date_create, @id_client, @rtn, @kai, @id_product)")
                
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}


//tabla ResgisterChair
const RegisterChair = async( pool)=>{

    for(let i=1 ; i<10009; i++){

        try {
            
            let id_invoice = i;
            let id_chair = Math.floor(Math.random()*(400)+1);
            let id_billboard =Math.floor(Math.random()*(400)+1);

            resp = await pool.request()
            .input('id_invoice', sql.Int, id_invoice)
            .input('id_chair', sql.Int, id_chair)
            .input('id_billboard', sql.Int, id_billboard)
            
            .query("INSERT INTO RegisterChair(id_invoice, id_chair, id_billboard) VALUES(@id_invoice, @id_chair, @id_billboard)")
                
            console.log(resp);
            
        } catch (error) {
            console.log(error);       
        }        
    }
}

module.exports ={
    Client,    
    Country,
    City,
    Establishment,
    MovieOltp,
    TypeMovie,
    LivingRoom,
    PhoneEstablishment,
    Billboard,
    Chair,
    Tikect,
    Invoice,
    RegisterChair
}