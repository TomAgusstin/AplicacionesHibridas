import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClienteForm from '../components/ClienteForm';
function ClienteNew() {
    const token = localStorage.getItem('token');
    const endPoint = import.meta.env.VITE_API_URL_CLIENTS;
    const [user, setCliente] = useState({ nombre: '', email: '', dni: '', email: '', celular: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function handlerChange(e) {
        
        const value = e.target.value;
        const key = e.target.name;

        setCliente({ ...user, [key]: value });
        // console.log({ user });
    }

    async function addCliente(event) {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            
            },
            body: JSON.stringify(user)
        }
        try {
            const response = await fetch(endPoint, options);

            if (!response) {
                console.error('Error al guardar cliente');
                const errorData = await response.json();
                throw new Error(errorData.msg);
            }

            const { data } = await response.json();
            console.table(data);
            setCliente({ ...user, nombre: '', email: '', dni: '', email: '', celular: '' })

            if(token)
            {
                navigate('/clientes', {
                state: {
                    mensaje: 'Cliente agregado exitosamente',
                    tipo: 'alert-success'
                }
            });
            }
            
              
        }
        catch (er) {
            setError(er.message);
            console.error(er);
        }
    }


    return (
        <>
            <ClienteForm
            user={user}
            handlerChange={handlerChange}
            onSubmit={addCliente}
            error={error}
            isEditing={false}
        />
        </>

    )
};

export default ClienteNew;