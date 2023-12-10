import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ruta = __dirname + "/public/index.html";

const app = express();
const PORT = 3000;

app.listen(PORT, console.log(`servidor levantado en el puerto ${PORT}`));

app.use(express.json());
app.use(cors());

//Devolver una página web como respuesta a una consulta GET
app.get("/", (req, res) => {
    res.sendFile(ruta);
});

//Ofrecer diferentes rutas con diferentes métodos HTTP que permitan las operaciones
//CRUD de datos alojados en un archivo JSON local

app.get("/canciones", (req, res) => {

    const canciones = JSON.parse(readFileSync('./repertorio.json', 'utf-8'));
    console.log(canciones);
    if(canciones.length === 0){
        console.log('No hay canciones en el repertorio');
        return ('No hay canciones en el repertorio');
    }else{
        console.log('hemos devuelto el json de canciones');
        res.status(200).json(canciones);
    }
});

app.post("/canciones", (req, res) => {
    const nuevaCancion = req.body;
    console.log(nuevaCancion);
    const canciones = JSON.parse(readFileSync('./repertorio.json', 'utf-8'));
    canciones.push(nuevaCancion);
    console.log('Hemos agregado la cancion a la lista'+canciones);
    return(writeFileSync('repertorio.json', JSON.stringify(canciones)));
});

app.put('/canciones/:id', (req , res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(readFileSync('./repertorio.json', 'utf-8'));
    const index = canciones.findIndex(p => p.id == id);
    canciones[index] = cancion;
    return(writeFileSync("repertorio.json", JSON.stringify(canciones)));
});

app.delete('/canciones/:id', (req , res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(readFileSync('./repertorio.json', 'utf-8'));
    const index = canciones.findIndex(p => p.id == id);
    canciones.splice(index,1);
    return(writeFileSync("repertorio.json", JSON.stringify(canciones)));
})

