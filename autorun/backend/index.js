import express from "express";
import routerAPI from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const uri_db = process.env.URI_DB;


const app = express();

mongoose.connect(uri_db);
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`Error con la conexion de la API.`);
    console.error(err);
})

db.once('open', () => {
    console.info('Conexion Exitosa');
})

//Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors());


app.get('/', (req, res) =>{
    res.send();
});

routerAPI(app);

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});