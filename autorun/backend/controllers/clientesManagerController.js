import Cliente from "../models/clienteModel.js";
import dotenv from "dotenv";

dotenv.config();

const getClientes = async(  req,  res) => {
    try 
    {
        const clientes = await Cliente.find();

        clientes.length > 0 ? res.status(200).json({ msg: "Clientes encontrado", data: clientes}) : res.status(204).json({msg: "Clientes no encontrados."});

    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error tratando de acceder al servidor", data: []});
    }
}


const getClienteById = async(  req,  res) => {
    try 
    {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente)
        {
             res.status(200).json({ msg: "Cliente encontrado", data: cliente});
        } 
        else 
        {
             res.status(204).json({ msg: "No se encontro el cliente", data: {}});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

const setCliente = async(  req,  res) =>{
    try 
    {
        const { nombre, apellido, dni, email, celular } =  req.body;
        
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ msg: "El item 'nombre' no puede estar vacío, es obligatorio." });
        }
        if (!apellido || apellido.trim() === '') {
            return res.status(400).json({ msg: "El item 'apellido' no puede estar vacío, es obligatorio." });
        } if (!dni) {
            return res.status(400).json({ msg: "El item 'dni' no puede estar vacío, es obligatorio." });
        } if (!email || email.trim() === '') {
            return res.status(400).json({ msg: "El item 'email' no puede estar vacío, es obligatorio." });
        } if (!celular) {
            return res.status(400).json({ msg: "El item 'celular' no puede estar vacío, es obligatorio." });
        }
        
        const cliente = await Cliente.findOne({ dni: dni });
        if( cliente )
        {
            return  res.status(200).json({msg:"Error, el cliente ya existe."});
        }
        
        await new Cliente( { nombre, apellido, dni, email, celular }).save(); 
   
         res.status(202).json({msg: "Cliente creado con exito." } );
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error intentando crear el cliente." + error});
    }
}

const deleteClienteById = async( req,  res) => {
    try 
    {
        const status = await Cliente.findByIdAndDelete(req.params.id);
        if (status)
        {
             res.status(200).json({ msg: "Cliente eliminado con exito.", data: []});
        } 
        else
        {
             res.status(204).json({ msg: "Cliente no encontrado.", data: []});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error intentando eliminar el cliente.", data: []});
    }
}

const updateClienteById = async(  req,  res) => {
    try 
    {     const { nombre, apellido, dni, email, celular } =  req.body;
        
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ msg: "El item 'nombre' no puede estar vacío, es obligatorio." });
        }
        if (!apellido || apellido.trim() === '') {
            return res.status(400).json({ msg: "El item 'apellido' no puede estar vacío, es obligatorio." });
        } if (!dni || dni.trim() === '') {
            return res.status(400).json({ msg: "El item 'dni' no puede estar vacío, es obligatorio." });
        } if (!email || email.trim() === '') {
            return res.status(400).json({ msg: "El item 'email' no puede estar vacío, es obligatorio." });
        } if (!celular || celular.trim() === '') {
            return res.status(400).json({ msg: "El item 'celular' no puede estar vacío, es obligatorio." });
        }
        

        const cliente = {nombre: nombre, apellido: apellido, dni: dni, email: email, celular: celular};
        const clienteNuevo = await Cliente.findByIdAndUpdate(req.params.id, cliente, { new: true});

        if (clienteNuevo)
        {
             res.status(200).json({ msg: "Cliente actualizado con exito.", data: clienteNuevo});
        } 
        else 
        {
             res.status(204).json({ msg: "Usuario no encontrado.", data: clienteNuevo});
        }
    } catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}


export { getClientes, getClienteById, setCliente, deleteClienteById, updateClienteById };