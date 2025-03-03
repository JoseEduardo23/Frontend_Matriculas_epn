import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";

const TablaMatri = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [matriculas, setMatriculas] = useState([]);

    const listarMatriculas = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:3000/api/matricula/matriculas`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            setMatriculas(respuesta.data);
        } catch (error) {
            toast.error("Error inesperado o no se pudo conectar");
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar este registro?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `http://localhost:3000/api/matricula/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };

                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });

                listarMatriculas();
            }
        } catch (error) {
            toast.error("Error inesperado");
        }
    };

    useEffect(() => {
        listarMatriculas();
    }, []);

    // Mostrar mensaje si no hay matriculas
    useEffect(() => {
        if (matriculas.length === 0) {
            toast.error("No existen registros");
        }
    }, [matriculas]);

    return (
        <>
            {matriculas.length > 0 ? (
                <table className="tab-container">
                    <thead>
                        <tr className="cuerpo-tab">
                            <th className="cabecera">N°</th>
                            <th className="cabecera">Estudiante</th>
                            <th className="cabecera">Materias</th>
                            <th className="cabecera">Descripción</th>
                            <th className="cabecera">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tab-cuerpo">
                        {matriculas.map((matricula, index) => (
                            <tr className="tr-table" key={matricula._id}>
                                <td className="cuerpo">{index + 1}</td>
                                <td className="cuerpo">
                                    {matricula.usuario?.nombre} {matricula.usuario?.apellido} ({matricula.usuario?.cedula})
                                </td>
                                <td className="cuerpo">
                                    {matricula.materias?.map((materia, i) => (
                                        <div key={i}>
                                            {materia.nombre} ({materia.codigo} )
                                        </div>
                                    ))}
                                </td>
                                <td className="cuerpo">{matricula.descripcion}</td>
                                <td className='py-2 text-center'>
                                    <MdNoteAdd
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() => navigate(`/dashboard/matriculas/visualizar_matri/${matricula._id}`)}
                                    />

                                    {auth.rol === "Admin" && (
                                        <>
                                            <MdInfo
                                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/matriculas/actualizar_matri/${matricula._id}`)}
                                            />
                                            <MdDeleteForever
                                                className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() => handleDelete(matricula._id)}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay matrículas registradas.</p>
            )}
        </>
    );
};

export default TablaMatri;
