const { seachProductor,addProductor, addMovie,addMovieProductor, seachGenres, addMovieGenres, addGenres, setDate} = require("./helpers/mssql");
const { moviePopular, movieDetails,companiesDetails, generateDeteils} = require("./helpers/query_api");

const { Client, MovieOltp, Country, Establishment, TypeMovie, LivingRoom, PhoneEstablishment, Billboard, Chair, Tikect, Invoice,RegisterChair   } = require("./helpers/Client");

const sql = require('mssql');
var faker = require('faker');

var randomName = faker.name.findName(); 

const dbConfig = {
    user: 'agchavez',
    password: 'Chavez_325AC',
    server: 'server-azure-chavez.database.windows.net', // You can use 'server-azure-chavez.database.windows.net\\instance' to connect to named instance
    database: 'MovieTheater2',
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true
        }
}

const main = async()=> {

    let pool = await sql.connect(dbConfig);

    //llenar tabla RegisterChair
    //RegisterChair(pool);

    //llenar tabla tikect
    //Tikect(pool);

    //Llenar tabla Chair
    //Client (pool);

    //Llenar tabla Invoice
    //Invoice(pool);

    //Llenar tabla Chair
    //Chair (pool);
    
    //Llenar tabla Billboard
    //Billboard(pool);

    //Llenar tabla PhoneEstablishment
    //PhoneEstablishment( pool);

    //Llenar tabla LivingRoom
    //LivingRoom( pool);

    //Llenar la tabla Establishment
    //Establishment(pool);

    //llenar tabla TypeMovie
    //TypeMovie(pool);
    
    //Se obtinen datos para llenar la tabla Movie
    /*for(let i =1 ; i <11; i++){
        await moviePopular(i).then(
            (element)=>{
                element.forEach(async (movie) => {
                    await movieDetails(movie['id']).then(async (resp)=>{
                        await MovieOltp (resp.title,resp.runtime,resp.overview,resp.homepage,pool)
                    })

                });
            }
        )
    } 
    MovieOltp(pool);
    */
}

main();