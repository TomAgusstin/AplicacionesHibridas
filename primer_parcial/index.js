import express from "express";
import routerAPI from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

// console.log(chalk.blue('Holaaaa'));
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

// const product = new ProductManager();

app.get('/', (req, res) =>{
    res.send();
});

routerAPI(app);

// app.get('/api/products', async (req, res) => {
//     let products = await getProducts();
//     res.send(products);
// });


// app.get('/api/products/:id', async (req, res) => {
//     const id = req.params.id;
//     let prod = await product.getProductsById(id);
//     res.send(prod);
// });

// app.post('/api/products', async (req, res) =>{

//     const newProduct = req.body;

//     await addProduct(newProduct);
//     res.status(201).send({ message: 'Producto agregado correctamente'});

// })

// app.put('/api/products', async  (req, res) =>{
//     const producToEdit = req.body;
//     await product.updateProduct(producToEdit.id, producToEdit);
//     res.status(200).send("Se edito correctamente el producto!");
// })

// app.delete('/api/products/:id', async  (req, res) =>{
//     const idToDelete = req.params.id;
//     await product.deleteProductById(idToDelete);
//     res.status(200).send("Se elimino correctamente el producto!");
// })

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});