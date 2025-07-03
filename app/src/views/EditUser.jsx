import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import UserForm from '../components/UserForm';

function EditUser() {
    const endpoint = 'http://127.0.0.1:3000/users'
    const [user, setUser] = useState({ nombre: '', email: '', password: '' })
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
                alert('Error al solicitar el usuarios')
                return
            }
            const { data } = await response.json();
            setUser(data);

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
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    async function editUser(e) {
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
                console.error('Error al editar usuario');
                return;
            }
            if(response.status === 401)
            {   
                const errorData = await response.json();
                setError(errorData.msg);
                return;
            }

            const data = await response.json();

            setUser({ ...user, name: '' });
            // Navegación 
            navigate('/usuarios', {
                state: {
                    mensaje: 'Usuario editado exitosamente',
                    tipo: 'alert-success'
                }
            });
            // setUser({...user, nombre: '', email: '', password:''})
        }
        catch (er) {
            console.error(er);
        }
    }



    return (
        <>
           <UserForm
            user={user}
            handlerChange={handlerChange}
            onSubmit={editUser}
            error={error}
            success={null} // o success si también lo manejas aquí
            isEditing={true}
            userId={id}
        />

        </>
    )
}

export default EditUser;