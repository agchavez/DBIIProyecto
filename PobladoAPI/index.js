const { seachProductor,addProductor, addMovie,addMovieProductor, seachGenres, addMovieGenres, setDate,seachMovie, addProductorContries, addMovieProductorContries, existContries} = require("./helpers/mssql");
const { moviePopular, movieDetails,companiesDetails, generateDeteils} = require("./helpers/query_api");
const sql = require('mssql');
var faker = require('faker');

var randomName = faker.name.findName(); 

const dbConfig = {
    user: '',
    password: '',
    server: 'server-azure-chavez.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'MovieDB',
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true
        }
}



const main = async()=> {

    let pool = await sql.connect(dbConfig);
    for (let i = 400; i < 500; i++) {
       await moviePopular(i).then(
            (element)=>{
                element.forEach( async (movieP) => {
                    
                    await Movie(movieP.id, pool);
                    
                });
                
            }
        )
        console.log("=======================");
        console.log(`pagina # ${i}`);
        console.log("=======================");     
        }
       
    
}

const Movie = async(id, pool)=>{
    
    await movieDetails(id).then(async (resp)=>{
        const exist = await seachMovie(resp.id, pool);
        if(exist){
            resp.production_countries.forEach(async(element) => {
                    const idContries = await existContries(element.iso_3166_1, pool);
                    if(idContries != null){
                        await addMovieProductorContries(resp.id, idContries, pool);
                    }else{
                        await addProductorContries(element.name, element.iso_3166_1, pool);
                        const idCon = await existContries(element.iso_3166_1, pool);
                        await addMovieProductorContries(resp.id, idCon, pool);
                    }
                    
                
            });


        }
        // await addMovie(resp.id, resp.title, resp.homepage, resp.original_title, resp.original_language,resp.popularity,resp.release_date, resp.status, pool);
        // await Productor(resp.production_companies, resp.id, pool);
        // await Gener(resp.genres, resp.id, pool);
    })
}


const Productor = async (list, idmovie, pool)=> {
    await list.forEach(element =>{
        seachProductor(element.id, pool).then(
            async (value)=>{
                
                if(!value){
                    await companiesDetails(element.id).then(
                        async (comp)=>{
                            
                            await addProductor(comp.id, comp.name, comp.homepage, comp.origin_country, comp.headquarters, pool);
                            
                        }
                    )

                }
                await addMovieProductor(idmovie, element.id, pool);
                
            }
        )
    });

}

const Gener = async (list, idmovie, pool)=> {
    await list.forEach( async(element) =>{
        await addMovieGenres(idmovie, element.id,pool);
    });

}

main();
