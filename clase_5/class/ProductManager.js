import fs from 'fs/promises';
const path = './json/products.json';

export default class ProductManager{

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

    async updateProduct(id, product){
        await this.getProducts();
        const i = this.products.findIndex( a => a.id == id);

        if( i != -1){
            this.products[i].title = product.title;
            this.products[i].description = product.description;
            this.products[i].price = product.price;
            this.products[i].stock = product.stock;

            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(path, data);
            return true
        } else {
            return false;
        }
    }

    async deleteProductById(id) {
        await this.getProducts();
        const i = this.products.findIndex( a => a.id == id);

        if( i != -1){
            this.products.splice(i, 1);
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(path, data);
            return true
        } else {
            return false;
        }
    }
}

// Exportación con CommonJS
// module.exports = ProductManager;
