// import express from "express";
// import routerAPI from "./routes/index.js";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";

// dotenv.config();
// const port = process.env.PORT;
// const uri_db = process.env.URI_DB;


// const app = express();

// mongoose.connect(uri_db);
// const db = mongoose.connection;

// db.on('error', (err) => {
//     console.error(`Error con la conexion de la API.`);
//     console.error(err);
// })

// db.once('open', () => {
//     console.info('Conexion Exitosa');
// })

// //Middleware
// app.use(express.json());
// app.use(express.static('public'));
// app.use(cors());


// app.get('/', (req, res) =>{
//     res.send();
// });

// routerAPI(app);

// app.listen(port, () => {
//     console.log(`Escuchando el puerto ${port}`);
// });

import express from "express";
import routerAPI from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
// No necesitas llamar a process.env.PORT en Vercel, ellos lo manejan internamente

const uri_db = process.env.URI_DB;
const app = express();

// --- CORRECCIÓN BASE DE DATOS PARA SERVERLESS ---
// Intentamos reusar la conexión si ya existe (para evitar abrir miles de conexiones)
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        // Ya está conectado, no hacemos nada
        return;
    }
    try {
        await mongoose.connect(uri_db);
        console.log("Conexion a DB establecida");
    } catch (error) {
        console.error("Error conectando a la DB:", error);
    }
};

// Ejecutamos la conexión antes de procesar las rutas
// (Ojo: en serverless a veces es mejor poner esto dentro de un middleware si tienes problemas)
connectDB(); 

// --- MIDDLEWARES ---
app.use(express.json());
app.use(cors()); // Vercel a veces requiere configuración extra de CORS en vercel.json, pero déjalo aquí por si acaso.

// Nota: app.use(express.static('public')); 
// EN VERCEL: No uses express para servir estáticos (imágenes, css). 
// Pon esos archivos en la carpeta 'public' en la raíz de tu proyecto y Vercel los sirve automáticamente.

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

routerAPI(app);

// --- CORRECCIÓN EXPORTACIÓN ---
// Usamos export default porque estás usando 'import' arriba
export default app;