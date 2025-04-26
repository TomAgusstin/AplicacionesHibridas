import recetasRouter from "./recetasRouter.js";
import userRoutes from "./usersRouter.js";

export default function routerAPI(app){
    app.use('/recetas', recetasRouter);
    app.use('/users', userRoutes);
}