const ProductManager = require('./class/ProductManager.js');

const http = require('http');
const port = 3000;
let admin = new ProductManager();

const server = http.createServer( async (req, res) => {
    let status = 200;
    const url = req.url;

    res.writeHead(status, {'content-type': 'text/html'});
    // res.end('Hola desde NodeJS - Servidor');

    if(url == '/')
    {
        res.end('<h1>Bienvenido al Himalayaaaa</h1>')
    }
    else if (url == '/products')
    {
            let products = await admin.getProducts();
            res.end(JSON.stringify(products));
    }
    else if (url == '/products/')
    {
        let parts = url.split('/');
        let productId = parts[2];

        let product = await admin.getProductsById(productId);


        res.end(JSON.stringify(product));
    }

    console.log(`Cliente Conectado ;)`);
});

server.listen(port, () => {
    console.log(`Servidor Web en el puerto ${port}`);
})
