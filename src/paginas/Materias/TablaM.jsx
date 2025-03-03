import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { MdDeleteForever, MdList, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";

const TablaM = ()=>{
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [materias, setmaterias] = useState([]);

    const listarmaterias = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:3000/api/materia/materias`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            setmaterias(respuesta.data);
        } catch (error) {
            toast.error("Error inesperado o no se pudo conectar");
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar este registro?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `http://localhost:3000/api/materia/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };

                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });

                listarmaterias();
            }
        } catch (error) {
            toast.error("Error inesperado");
        }
    };

    useEffect(() => {
        listarmaterias();
    }, []);

    // Mostrar mensaje si no hay materias
    useEffect(() => {
        if (materias.length === 0) {
            toast.error("No existen registros");
        }
    }, [materias]);

    // Mostrar tabla
    return (
        <>
            {materias.length > 0 ? (
                <table className="tab-container">
                    <thead>
                        <tr className="cuerpo-tab">
                            <th className="cabecera">N°</th>
                            <th className="cabecera">Nombre</th>
                            <th className="cabecera">Descripcion</th>
                            <th className="cabecera">Estado</th>
                            <th className="cabecera">Codigo</th>
                            <th className="cabecera">Creditos</th>
                            <th className="cabecera">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tab-cuerpo">
                        {materias.map((materia, index) => (
                            <tr className="tr-table" key={materia._id}>
                                <td className="cuerpo">{index + 1}</td>
                                <td className="cuerpo">{materia.nombre}</td>
                                <td className="cuerpo">{materia.descripcion}</td>
                                <td className="cuerpo">{materia.estado}</td>
                                <td className="cuerpo">{materia.codigo}</td>
                                <td className="cuerpo">{materia.creditos}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/materias/visualizar_mat/${materia._id}`)} />

                                            {
                                                auth.rol === "Admin" &&
                                                (
                                                    <>
                                                        
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                            onClick={() => navigate(`/dashboard/materias/actualizar_materia/${materia._id}`)}
                                                        />

                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                            onClick={() => { handleDelete(materia._id) }}
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
                <p>No hay materias registrados.</p>
            )}
        </>
    )
}

export default TablaM
