const fs = require('fs/promises');
const path = './json/products.json';

class ProductManager{

    products = [];

    constructor(products=[]){

        this.products = products;
    }

   async addProduct(product){
        await this.getProducts();
        product.id = crypto.randomUUID();

            if(!!this.products.find(prod => prod.id === product.id))
            {
                console.log(`Error! No se ha podido agregar el producto, ese mismo ID ya pertenece a otro producto.`);
            }
            else
            {
                this.products.push(product);

                await fs.writeFile(path, JSON.stringify(this.products))
                .then( () => {
                    console.log(`Producto guardado con exito.`);
                })
            }
        
    }

    async getProducts(){
        try{
            const data = await fs.readFile(path, 'utf-8');
            this.products = JSON.parse(data);
            // console.log(this.products);
            return this.products;
        }catch(err){
            console.log(`Errorrr! ${err}`);
        }
        
    }
    
    async getProductsById(id){
        await this.getProducts();
        return this.products.find(a => a.id === id);
    }
}

// Exportación con CommonJS
module.exports = ProductManager;