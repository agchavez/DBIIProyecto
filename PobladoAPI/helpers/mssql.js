const sql = require('mssql');


//Configuraciones de la base de datos


const addMovie = async(id,title, homepage, origin_title, original_language, popularity, relase_date, statusmovie, pool)=>{
    try {
        
        let resp = await pool.request()
                    .input('idProductor', sql.Int , id)
                    .input('origin_title', sql.Text, origin_title)
                    .input('homepage', sql.Text, homepage)
                    .input('original_language',sql.VarChar, original_language)
                    .input('popularity',sql.Float, popularity)
                    .input('relase_date',sql.Date, relase_date)
                    .input('statusmovie',sql.Text, statusmovie)
                    .input('title', sql.Text, title)
                    .query("INSERT INTO Movie(id, homepage, origin_title, original_language, popularity, relase_date, statusmovie, title) VALUES(@idProductor, @homepage, @origin_title, @original_language, @popularity, @relase_date, @statusmovie, @title)")
        //console.log("Pelicuala agregada", id);
        
    } catch (error) {
        console.log("error agregar movie", id);
        
    }
    
}

const seachMovie = async(id = '', pool)=>{
    try {
        
        let result1 = await pool.request()
                      .input('idMovie', sql.Int, id)  
                      .query("SELECT COUNT(*) AS Cantidad FROM Movie WHERE id = @idMovie");
        const cant = result1.recordset[0].Cantidad;
            if (cant == 0){
                return false
            }else{
                return true
            }
            
        } catch (error) {
            console.log(error)   
        }
    }


    const seachProductor = async(id = '', pool)=>{
        try {
            
            let result1 = await pool.request()
                      .input('idProductor', sql.Int, id)  
                      .query("SELECT COUNT(*) AS Cantidad FROM Productor WHERE id = @idProductor");
        const cant = result1.recordset[0].Cantidad;
        if (cant == 0){
            return false
        }else{
            return true
        }
        
    } catch (error) {
        console.log(error)   
    }
}



const addProductor = async(id, nameP, page, country, headquarters, pool)=>{
    try {
        let resp = await pool.request()
                    .input('idProductor', sql.Int , id)
                    .input('name', sql.Text, nameP)
                    .input('page', sql.Text, page)
                    .input('origin_country',sql.VarChar, country)
                    .input('headquarters', sql.Text, headquarters)
                    .query("INSERT INTO Productor(id, name, homepage, headquarters, origin_country) VALUES(@idProductor, @name,@page,@headquarters,@origin_country)")
        
        
    } catch (error) {
        console.log("error Productor", id);
        
    }
    
}

const addMovieProductor = async(id_movie, id_productor, pool)=>{
    
    try {
        let resp = await pool.request()
                    .input('id_movie', sql.Int , id_movie)
                    .input('id_productor', sql.Int , id_productor)
                    .query("INSERT INTO MovieProductor(id_movie, id_productor) VALUES(@id_movie, @id_productor)")
        console.log("addMovieProductor agregada", id_movie);
        
    } catch (error) {
        console.log('error addMovieProductor')
    }
    
}
const seachGenres = async(id = '', pool)=>{
    try {
        
        let result1 = await pool.request()
                      .input('idGenres', sql.Int, id)  
                      .query("SELECT COUNT(*) AS Cantidad FROM Genres WHERE id = @idGenres");
        const cant = result1.recordset[0].Cantidad;
        
        if (cant == 0){
            return false
        }else{
            return true
        }
        
    } catch (error) {
        console.log(error)   
    }
}


const addGenres = async(id, nameG, pool)=>{
   seachGenres(id).then(async (resp)=>{
        
        if(!resp){
            console.log(id, nameG);
            try {
                
                let temp = await pool.request()
                            .input('idGenres', sql.Int , id)
                            .input('name', sql.Text, nameG)
                            .query("INSERT INTO Genres(id, name) VALUES(@idGenres, @name)")
                console.log(temp);
                
                
                
            } catch (error) {
                console.log("error agregar genero");
                
                
            }
            
        } 
   })
    
}
const setDate = async(id_movie, pool) =>{

    try {
        let resp = await pool.request()
                    .input('idmovie', sql.Int, id_movie)
                    .query("SELECT * FROM Movie WHERE id= @idmovie")
        return resp.recordset[0];
        
    } catch (error) {
        console.log(error)
    }
}

const addMovieGenres = async(id_movie, id_genres, pool)=>{
    try {
        let resp = await pool.request()
                    .input('id_movie', sql.Int , id_movie)
                    .input('id_genres', sql.Int , id_genres)
                    .query("INSERT INTO MovieGenres(id_movie, id_genres) VALUES(@id_movie, @id_genres)")
        //console.log("Genero", id_movie);
        
    } catch (error) {
        console.log("error Movie Genres", id_movie);
        
    }
    
}

const addProductorContries = async(nameP, iso, pool)=>{
    try {
        let resp = await pool.request()
                    .input('name', sql.Text, nameP)
                    .input('iso', sql.VarChar(2), iso)
                    .query("INSERT INTO ProductionContries(name, iso_3166_1) VALUES(@name, @iso)")
            console.log(resp);
        
        
    } catch (error) {
        console.log("error Productor", error);
        return false;
        
    }
    
}

const addMovieProductorContries = async(id_movie, id_productor_contries, pool)=>{
    
    try {
        let resp = await pool.request()
                    .input('id_movie', sql.Int , id_movie)
                    .input('id_productor', sql.Int , id_productor_contries)
                    .query("INSERT INTO MoviePContries(id_movie, id_contries) VALUES(@id_movie, @id_productor)")
        console.log("addMovieProductor agregada", id_movie);
        
    } catch (error) {
        console.log('error addMovieProductor', error)
    }
    
}


const existContries = async(iso, pool) => {
    try {
        let result1 = await pool.request()
                      .input('iso', sql.VarChar(2), iso)  
                      .query("SELECT id FROM ProductionContries WHERE iso_3166_1 = @iso");
        const cant = result1.recordset[0].id;
        return cant;
        
    } catch (error) {
        
    }
}


module.exports ={
    seachProductor,
    addProductor,
    addMovie,
    addMovieProductor,
    seachGenres,
    addGenres,
    addMovieGenres,
    setDate,
    seachMovie,
    addProductorContries,
    addMovieProductorContries,
    existContries
    
}

