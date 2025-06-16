import { useState, useEffect } from 'react'

function CarNew() {

    const endPoint = 'http://127.0.0.1:3000/autos';
    const endPointCategorias = 'http://127.0.0.1:3000/categorias';
    const [car, setCar] = useState({ marca: '', modelo: '', categoriaId: '', infoPrecio: [{ precio: '', tipoCuota: '' }], alicuota: '', img: '', alt: '' });
    const [cat, setCategorias] = useState([])

    async function getCategorias()
    {   
         try {
        
              const response = await fetch(endPointCategorias);
        
              if (!response) {
                console.error('Error obteniendo los autos');
                return;
              }
        
              const { data } = await response.json();
              console.table(data);
              setCategorias(data);
            }
            catch (ex) {
              console.error(ex);
            }

    }

    function handlerChange(e) {
        const value = e.target.value;
        const key = e.target.name;

        setCar({ ...car, [key]: value });
        console.log({ car });
    }

    function handleInfoPrecioChange(index, field, value) {
        const updatedInfoPrecio = [...car.infoPrecio];
        updatedInfoPrecio[index][field] = value;
        setCar({ ...car, infoPrecio: updatedInfoPrecio });
    }

    function addInfoPrecio() {
        setCar({
            ...car,
            infoPrecio: [...car.infoPrecio, { precio: '', tipoCuota: '' }]
        });
    }

    function removeInfoPrecio(index) {
        const updatedInfoPrecio = car.infoPrecio.filter((_, i) => i !== index);
        setCar({ ...car, infoPrecio: updatedInfoPrecio });
    }

    async function addCar(event) {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }
        try {
            const response = await fetch(endPoint, options);

            if (!response) {
                alert('Error al guardar auto');
                return;
            }

            const { data } = await response.json();
            console.table(data);
            // getCars();

            setCar({ ...car, marca: '', modelo: '', categoriaId: '', infoPrecio: [ { precio: '', tipoCuota: '' }], alicuota: '', img: '', alt: '' })
        }
        catch (er) {
            console.error(er);
        }
    }

 useEffect(() => {
            getCategorias();
          }, {})
          
    return (
        <>
            <h2>Nuevo auto</h2>

            <hr />
            <form onSubmit={addCar}>
                <label htmlFor="marca">Marca</label>
                <input
                    name='marca'
                    value={car.marca}
                    type="text"
                    onChange={handlerChange}
                />

                <label htmlFor="modelo">Modelo</label>
                <input
                    name='modelo'
                    value={car.modelo}
                    onChange={handlerChange}
                    type="text"
                />

                <label htmlFor="categoria">Categoria</label>
                {/* Tengo que hacer un select que me recopile el idCategoria y me muestra el nombre */}
                <select onChange={handlerChange} name='categoriaId'>
                    <option value=''></option>
                    {cat != null && cat.map(
                        c=>(
                            <option key={c._id} value={c._id}>{c.titulo} / {c.estado}</option>
                        )
                        
                    )
                }
                </select>
                    

                <label>Info. Precio</label>
                {car.infoPrecio.map((info, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Tipo de Cuota"
                            value={info.tipoCuota}
                            onChange={(e) => handleInfoPrecioChange(index, 'tipoCuota', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Precio"
                            value={info.precio}
                            onChange={(e) => handleInfoPrecioChange(index, 'precio', e.target.value)}
                        />
                        <button type="button" onClick={() => removeInfoPrecio(index)}>🗑</button>
                    </div>
                ))}
                <button type="button" onClick={addInfoPrecio}>+ Agregar Cuota</button>

                <label htmlFor="alicuota">Alicuota</label>
                <input
                    name='alicuota'
                    value={car.alicuota}
                    type="text"
                    onChange={handlerChange}
                />

                <label htmlFor="img">Imagen</label>
                <input
                    name='img'
                    value={car.img}
                    type="text"
                    onChange={handlerChange}
                />
                <label htmlFor="alt">Texto de imagen</label>
                <input
                    name='alt'
                    value={car.alt}
                    type="text"
                    onChange={handlerChange}
                />

                <button type='submit'>Agregar auto</button>
            </form>
        </>

    )
};

export default CarNew;