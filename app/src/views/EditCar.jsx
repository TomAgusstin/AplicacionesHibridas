import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditCar() {
    const endpoint = 'http://127.0.0.1:3000/autos';
    const endPointCategorias = 'http://127.0.0.1:3000/categorias';
    const [car, setCar] = useState({ marca: '', modelo: '', categoriaId: [], infoPrecio: [], alicuota: '', img: '', alt: '' })
    const [cat, setCategorias] = useState([]);
    const { id } = useParams();
    const token = localStorage.getItem('token');
    
    const navigate = useNavigate();
    async function getCategorias()
    {   
         try {
        
              const response = await fetch(endPointCategorias, {headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`}
            });
        
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
    async function getCarById() {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);
            if (!response.ok) {
                // alert('Error al solicitar el auto')
                navigate('/')
            }
            const { data } = await response.json();
            setCar(data);

            console.log({ data });

        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }
    useEffect(() => {

        getCarById();
        getCategorias();
    }, [])

    function handlerChange(e) {
        setCar({ ...car, [e.target.name]: e.target.value })
    }


    async function setEditCar(e) {
        e.preventDefault();
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(car)
        }
        try {
            const response = await fetch(`${endpoint}/${id}`, options);

            if (!response) {
                console.error('Error al editar auto');
                return;
            }

            const data = await response.json();

            setCar({ ...car, marca: '', modelo: '' });
            // Navegación 
            navigate('/autos');
        }
        catch (er) {
            console.error(er);
        }
    }

    function handleInfoPrecioChange(index, field, value) {
        const updatedInfoPrecio = [...car.infoPrecio];
        updatedInfoPrecio[index] = {
            ...updatedInfoPrecio[index],
            [field]: value
        };
        setCar({ ...car, infoPrecio: updatedInfoPrecio });
    }

    function addInfoPrecio() {
        setCar({
            ...car,
            infoPrecio: [
                ...car.infoPrecio,
                { tipoCuota: '', precio: '' } // sin _id porque es nueva
            ]
        });
    }

    function removeInfoPrecio(index) {
        const cuota = car.infoPrecio[index];

        // Si tiene _id, registramos para eliminar en el backend
        let eliminados = [...(car.infoPrecioEliminados || [])];
        if (cuota._id) {
            eliminados.push(cuota._id);
        }

        const updatedInfoPrecio = car.infoPrecio.filter((_, i) => i !== index);

        setCar({
            ...car,
            infoPrecio: updatedInfoPrecio
        });
    }

    return (
        <>
            <h2> Actualizar Auto {id}</h2>
            <hr />

            <form onSubmit={setEditCar}>
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
                 <select onChange={handlerChange} name='categoriaId'>
                    {cat != null && cat.map(
                        c=>(
                            <option key={c._id} value={c._id}>{c.titulo} / {c.estado}</option>
                        )
                        
                    )
                }
                </select>
                {/* Tengo que hacer un select que me recopile el idCategoria y me muestra el nombre */}

                <label>Info. Precio</label>
                {car.infoPrecio.map((info, index) => (
                    <div key={info._id || index} style={{ marginBottom: '1rem' }}>
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

                <button type='submit'>Guardar auto</button>
            </form>

        </>
    )
}

export default EditCar;