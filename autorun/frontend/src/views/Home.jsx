import Card from '../components/Card'
import { useEffect, useState } from 'react';
import Table from '../components/Table'

function Home() {

    const [autos, setAutos] = useState([]);
    const endpoint = import.meta.env.VITE_API_URL_CARS;
    async function getCars() {
        try {
            const response = await fetch(endpoint);

            if (!response) {
                console.error('Error obteniendo los autos');
                return;
            }

            const { data } = await response.json();
            console.table(data);
            setAutos(data);

        }
        catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        getCars();
    }, [])
    return (
        <>
        <div className="background-home d-flex flex-column-reverse">
                            <div className="d-flex justify-content-center mb-4 ">
                     <a href="/contacto" className='btn btn-primary'>Contactenos</a>
                </div>
                 <h1 className='text-center mt-5 text-light fs-2'>
                    Corriendo hacia tu proximo auto
                </h1>
     
        </div>

            <div className="mt-1 d-lg-flex justify-content-center">
                <div className="col-xs-12 col-md-4 col-lg-4 m-auto p-3">
                    <h2 className="text-center">
                        Sobre nosotros
                    </h2>
                    <p>
                        Autorun S.R.L. se enfoca en brindar a los clientes la oportunidad de adquirir
                        vehículos 0km a través de venta convencional usados y adjudicados, con un respaldo y soporte administrativo
                        durante todo el proceso.
                    </p>
                </div>

                <div className="col-xs-12  col-md-4 col-lg-4 m-auto p-3">
                    <h2 className="text-center">
                        ¡Te compramos el auto!
                    </h2>
                    <p>
                        Ofrecemos la opción de comprar vehículos usados directamente, utilizando la experiencia de un especialista
                        para evaluar y verificar la calidad de las unidades usadas.
                      
                    </p>
                </div>

            </div>

            <div className="">
                <h3 className='col-xs-12 col-md-12 col-xl-12 text-center mb-4'>
                    ¿Cual se adapta a vos?
                </h3>

                <div className='row justify-content-around'>
                    {
                        autos != null && autos.map(
                            a => <Card
                                key={a._id}
                                marca={a.marca}
                                modelo={a.modelo}
                                categoria={a.categoriaId}
                                infoPrecio={a.infoPrecio}
                                alicuota={a.alicuota}
                                img={a.img}
                                alt={a.alt}
                                _id={a._id}
                            />
                        )
                    }
                 
                </div>
            </div>

        </>

    )
};

export default Home;