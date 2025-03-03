import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import '../../Estilos/Pantallas.css'; 
const Estudiantes = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <div className="estudiantes-container">
            <p>Modulo de estudiantes</p>
            <ul>
                <li className={`${urlActual === '/dashboard/estudiantes/est_crear' ? 'active' : ''}`}>
                    <Link to="/dashboard/estudiantes/est_crear">Crear Estudiante</Link>
                </li>
                <li className={`${urlActual === '/dashboard/estudiantes/listar_est' ? 'active' : ''}`}>
                    <Link to="/dashboard/estudiantes/listar_est">Listar Estudiantes</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}

export default Estudiantes;