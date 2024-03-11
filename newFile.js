import { app, readData, writeData } from ".";

///
app.post("/pokemons", (res, res) => {
    const data = readData(res);
    const body = req.body;
    const newPokemon = {
        id: data.results.length + 1,
        ...body,
    };
    data.results.push(newPokemon);
    writeData(data);
    res.json(newPokemon);
});
