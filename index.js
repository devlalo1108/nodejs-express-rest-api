import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.json());

export const readData = () =>{
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    }catch(error){ 
        console.log(error);
    }    
};

export const writeData = (data) =>{
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    }catch(error){
        console.log(error);

    }
};


app.get('/', (req, res) => {
   res.send("Bienvenido a mi primer API nodeJS!");
});

///creando empoint raiz trae todos los pokemons

app.get("/pokemons", (req, res) => {
    const data = readData();
    res.json(data);
});

///buscar pokemon por id

app.get("/pokemons/:id",(req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemon = data.results.find((pokemon) => pokemon.id === id);
    res.json(pokemon);
});


//agregar nuevoPokemon
app.post("/pokemons", (req, res) =>{
    const data = readData();
    const body = req.body;
    const newPokemon = {
        id: data.results.length + 1,
        ...body,
    };
    data.results.push(newPokemon);
    writeData(data);
    res.json(newPokemon);
});


//actualizar pokemon
app.put("/pokemons/:id",(req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const pokemonIndex = data.results.findIndex((pokemon) => pokemon.id === id);
    data.results[pokemonIndex]={
        ...data.results[pokemonIndex],
        ...body,
    };
    writeData(data);
    //res.json(data.results[pokemonIndex]);
    res.json({message:"Pokemon actualizado con exito"});

});

/*
const data = readData();
const id = parseInt(req.params.id);
const pokemon = data.results.find((pokemon) => pokemon.id === id);
res.json(pokemon);*/


//eliminar pokemon
app.delete("/pokemons/:id",(req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemonIndex = data.results.findIndex((pokemon) => pokemon.id === id);
    data.results.splice(pokemonIndex, 1);
    writeData(data);
    res.json({message:"Pokemon eliminado con exito"});
});



app.listen(3000, () => {
    console.log("Sevidor iniciado puerto:3000")
});
