import ProductsContainer from '../components/ProductsContainer'
import Card from '../components/Card'
import { useEffect, useState } from 'react';
import Table from '../components/Table'

function Home()
{

const [ autos, setAutos ] = useState([]);
const endpoint = 'http://localhost:3000/autos';
async function getCars(){
    try{
            const response = await fetch(endpoint);
            
            if(!response)
            {
                console.error('Error obteniendo los autos');
                return;
            }

            const {data} = await response.json();
            console.table(data);
            setAutos(data);
    }
    catch(ex)
    {
        console.error(ex);
    }
};

useEffect(  () => {
    getCars();
}, []  )
    return(
        <>
                <h2>Inicio</h2>

                
    <ProductsContainer>

       

    </ProductsContainer>
        </>
        
    )
};

export default Home;