import React from "react"
import { Link, useLocation, Outlet } from "react-router-dom";
import '../../Estilos/Pantallas.css';

const Matriculas = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <>
            <div className="estudiantes-container">
                <p>Modulo de matriculas</p>
                <ul>
                    <li className={`${urlActual === '/dashboard/matriculas/matri_crear' ? 'active' : ''}`}>
                        <Link to="/dashboard/matriculas/matri_crear">Crear Matricula</Link>
                    </li>
                    <li className={`${urlActual === '/dashboard/matriculas/listar_matri' ? 'active' : ''}`}>
                        <Link to="/dashboard/matriculas/listar_matri">Listar Matriculas</Link>
                    </li>
                </ul>

                <Outlet />
            </div>
        </>
    )
}

export default Matriculas