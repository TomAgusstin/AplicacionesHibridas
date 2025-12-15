import Cliente from "../models/clienteModel.js";
import PlanCliente from "../models/seguimientoClienteModel.js";

const getPlanes = async (req, res) => {

    try {
        const plan = await PlanCliente.find().populate('planId').populate('clienteId');
        plan.length > 0 ? res.status(200).json({ msg: "Se encontraron planes...", data: plan }) : res.status(404).json({ msg: "No se encontraron planes." });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "No se encontraron autos", data: e });
    }

};

const addPlan = async (req, res) => {
    try {
        const {planId, clienteId } = req.body;
        // infoPrecio = JSON.parse(infoPrecio);
        if (!planId || planId.trim() === '') {
            return res.status(400).json({ msg: "El item 'planId' no puede estar vacío, es obligatorio." });
        }
                if (!clienteId || clienteId.trim() === '') {
            return res.status(400).json({ msg: "El item 'clienteId' no puede estar vacío, es obligatorio." });
        }
        
        const agregado = await new PlanCliente({ planId, clienteId }).save();
        console.log(agregado)
        return agregado ?  res.status(202).json({ msg: 'Plan agregada exitosamente', data: agregado }) : res.status(404).json({ msg: 'No se pudo agregar el plan', data: agregado })
        

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al intentar agregar el auto", data: e });

    }
}
// Busqueda por ID
const getPlanByIdCliente = async (req, res) => {

    try {
       
        const cliente = await Cliente.findById(req.params.id);
        const planes = await PlanCliente.find({clienteId: req.params.id}).populate('planId');
        cliente ? res.status(200).json({ msg: "Se encontraron planes", data: {
                cliente: cliente,
                planes: planes
            } }) : res.status(404).json({ msg: "No se encontro ningun plan con ese ID", data: planes })

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al querer buscar plan.", data: e });
    }

};


// const deleteAutoById = async (req, res) => {
//     try {
//         const { id } = req.params
//         const status = await Auto.findByIdAndDelete(id);
//         if (status) {
//             res.status(200).json({ msg: 'Auto eliminado', data: [] });
//         } else {
//             res.status(404).json({ msg: 'No se encontro el auto a eliminar ' + id, data: [] });
//         }

//     }
//     catch (e) {
//         console.error(e);
//         res.status(500).json({ msg: "No se pudo eliminar el auto", data: e });

//     }
// }


export { addPlan, getPlanes, getPlanByIdCliente};