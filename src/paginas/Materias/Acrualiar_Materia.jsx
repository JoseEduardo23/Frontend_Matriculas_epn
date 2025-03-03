import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formulario_mat } from "./Formulario_mat";
import { toast } from "react-toastify";

const Actualizar_Materia = () =>{
    const { id } = useParams();
    const [materia, setmateria] = useState(null);
    const [mensaje, setMensaje] = useState({ respuesta: "", tipo: "" });

    useEffect(() => {
        
        const consultarmateria = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No se ha encontrado un token válido");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };
                const url = `http://localhost:3000/api/materia/${id}`;

                const respuesta = await axios.get(url, { headers });


                if (!respuesta.data || Object.keys(respuesta.data).length === 0) {
                    setMensaje({ respuesta: "materia no encontrado", tipo: "error" });
                    return;
                }

                setmateria(respuesta.data);
            } catch (error) {
                console.error("Error en la consulta del materia:", error);
                setMensaje({ respuesta: "Error al obtener el materia", tipo: "error" });
            }
        };

        if (id) consultarmateria();
    }, [id]);

    return (
        <>
            {materia ? (
                <Formulario_mat materia={materia} />
            ) : (
                mensaje.respuesta && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.respuesta}</p>
            )}
        </>
    )
}

export default Actualizar_Materia;