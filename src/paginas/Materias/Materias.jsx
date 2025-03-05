import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const Materias = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <>
            <div className="estudiantes-container">
                <p>Módulo de materias</p>
                <ul>
                    <li className={`${urlActual === '/dashboard/materias/mat_crear' ? 'active' : ''}`}>
                        <Link to="/dashboard/materias/mat_crear">Ingresar materia</Link>
                    </li>
                    <li className={`${urlActual === '/dashboard/materias/listar_mat' ? 'active' : ''}`}>
                        <Link to="/dashboard/materias/listar_mat">Lista de materias</Link>
                    </li>
                </ul>
                <Outlet />
            </div>
        </>
    );
}

export default Materias;