import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import ClienteForm from '../components/ClienteForm';

function EditCliente() {
    const endpoint = 'http://127.0.0.1:3000/clientes'
    const [user, setCliente] = useState({ nombre: '', email: '', dni: '', email: '', celular: '' });
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function getUserById() {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(`${endpoint}/${id}`, options);
            if (!response.ok) {
                alert('Error al solicitar el cliente')
                return
            }
            const { data } = await response.json();
            setCliente(data);

            console.log(data);

        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
        }
    }
    useEffect(() => {

        getUserById();

    }, [])




    function handlerChange(e) {
        setCliente({ ...user, [e.target.name]: e.target.value })
    }


    async function editCliente(e) {
        e.preventDefault();
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        }
        try {
            const response = await fetch(`${endpoint}/${id}`, options);

            if (!response) {
                console.error('Error al editar cliente');
                return;
            }
            if(response.status === 401)
            {   
                const errorData = await response.json();
                setError(errorData.msg);
                return;
            }

            const data = await response.json();

            setCliente({ ...user, name: '' });
            // Navegación 
            navigate('/clientes', {
                state: {
                    mensaje: 'Cliente editado exitosamente',
                    tipo: 'alert-success'
                }
            });
            // setCliente({...user, nombre: '', email: '', password:''})
        }
        catch (er) {
            console.error(er);
        }
    }



    return (
        <>
           <ClienteForm
            user={user}
            handlerChange={handlerChange}
            onSubmit={editCliente}
            error={error}
            success={null} // o success si también lo manejas aquí
            isEditing={true}
            userId={id}
        />

        </>
    )
}

export default EditCliente;