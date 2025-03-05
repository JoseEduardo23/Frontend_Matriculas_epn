import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { MdDeleteForever, MdList, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import '../../Estilos/Table_est.css'

const Tabla_est = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [estudiantes, setEstudiantes] = useState([]);

    const listarEstudiantes = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:3000/api/usuario/usuarios`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            setEstudiantes(respuesta.data);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar este registro?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `http://localhost:3000/api/usuario/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };

                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });

                listarEstudiantes();
            }
        } catch (error) {
            toast.error("Error inesperado");
        }
    };

    useEffect(() => {
        listarEstudiantes();
    }, []);

    // Mostrar mensaje si no hay estudiantes
    useEffect(() => {
        if (estudiantes.length === 0) {
            toast.error("No existen registros");
        }
    }, [estudiantes]);

    // Mostrar tabla
    return (
        <>
            {estudiantes.length > 0 ? (
                <table className="tab-container">
                    <thead>
                        <tr className="cuerpo-tab">
                            <th className="cabecera">N°</th>
                            <th className="cabecera">Nombre</th>
                            <th className="cabecera">Apellido</th>
                            <th className="cabecera">Email</th>
                            <th className="cabecera">Celular</th>
                            <th className="cabecera">Cedula</th>
                            <th className="cabecera">Fecha de nacimiento</th>
                            <th className="cabecera">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tab-cuerpo">
                        {estudiantes.map((estudiante, index) => (
                            <tr className="tr-table" key={estudiante._id}>
                                <td className="cuerpo">{index + 1}</td>
                                <td className="cuerpo">{estudiante.nombre}</td>
                                <td className="cuerpo">{estudiante.apellido}</td>
                                <td className="cuerpo">{estudiante.email}</td>
                                <td className="cuerpo">{estudiante.celular}</td>
                                <td className="cuerpo">{estudiante.cedula}</td>
                                <td className="cuerpo">{estudiante.fecha_nacimiento}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/estudiantes/visualizar_est/${estudiante._id}`)} />

                                            {
                                                auth.rol === "Admin" &&
                                                (
                                                    <>
                                                        
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                            onClick={() => navigate(`/dashboard/estudiantes/actualizar_est/${estudiante._id}`)}
                                                        />

                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                            onClick={() => { handleDelete(estudiante._id) }}
                                                        />
                                                    </>
                                                )
                                            }
                                        </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay estudiantes registrados.</p>
            )}
        </>
    );
};

export default Tabla_est;