import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const planClienteSchema = new Schema({
     planId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auto',
                required: [true, 'El Id del plan del auto es obligatorio'],
                sctrictPopulate: false
            },
             clienteId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'cliente',
                        required: [true, 'El Id del cliente es obligatorio'],
                        sctrictPopulate: false
                    }
            
    });

const PlanCliente = mongoose.model('planCliente', planClienteSchema);

export default PlanCliente;