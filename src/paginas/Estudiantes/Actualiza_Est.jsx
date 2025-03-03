import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formulario_est } from "./Formulario_est";
import { toast } from "react-toastify";

const Actualizar_Est = () => {
    const { id } = useParams();
    const [estudiante, setEstudiante] = useState(null);
    const [mensaje, setMensaje] = useState({ respuesta: "", tipo: "" });

    useEffect(() => {
        
        const consultarEstudiante = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No se ha encontrado un token válido");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };
                const url = `http://localhost:3000/api/usuario/${id}`;

                const respuesta = await axios.get(url, { headers });


                if (!respuesta.data || Object.keys(respuesta.data).length === 0) {
                    setMensaje({ respuesta: "Estudiante no encontrado", tipo: "error" });
                    return;
                }

                setEstudiante(respuesta.data);
            } catch (error) {
                console.error("Error en la consulta del estudiante:", error);
                setMensaje({ respuesta: "Error al obtener el estudiante", tipo: "error" });
            }
        };

        if (id) consultarEstudiante();
    }, [id]);

    return (
        <>
            {estudiante ? (
                <Formulario_est estudiante={estudiante} />
            ) : (
                mensaje.respuesta && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.respuesta}</p>
            )}
        </>
    );
};

export default Actualizar_Est;