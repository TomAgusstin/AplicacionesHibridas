import chalk from "chalk";
import express from "express";
import ProductManager from "./class/ProductManager.js";


// console.log(chalk.blue('Holaaaa'));

const port = 3000;
const app = express();
app.use(express.json());
const product = new ProductManager();

app.get('/api/products', async (req, res) => {
    let products = await product.getProducts();
    res.send(products);
});


app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    let prod = await product.getProductsById(id);
    res.send(prod);
});

app.post('/api/products', async (req, res) =>{

    const newProduct = req.body;

    await product.addProduct(newProduct);
    res.status(201).send({ message: 'Producto agregado correctamente'});

})

app.put('/api/products', async  (req, res) =>{
    const producToEdit = req.body;
    await product.updateProduct(producToEdit.id, producToEdit);
    res.status(200).send("Se edito correctamente el producto!");
})

app.delete('/api/products/:id', async  (req, res) =>{
    const idToDelete = req.params.id;
    await product.deleteProductById(idToDelete);
    res.status(200).send("Se elimino correctamente el producto!");
})

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});