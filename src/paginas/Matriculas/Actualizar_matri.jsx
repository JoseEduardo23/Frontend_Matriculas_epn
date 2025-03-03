import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Formulario_matri from "./Formulario_matri";
import { toast } from "react-toastify";

const Actualizar_matri = () =>{
    const { id } = useParams();
    const [matricula, setmatricula] = useState(null);
    const [mensaje, setMensaje] = useState({ respuesta: "", tipo: "" });

    useEffect(() => {
        
        const consultarmatricula = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No se ha encontrado un token válido");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };
                const url = `http://localhost:3000/api/matricula/${id}`;

                const respuesta = await axios.get(url, { headers });


                if (!respuesta.data || Object.keys(respuesta.data).length === 0) {
                    setMensaje({ respuesta: "matricula no encontrado", tipo: "error" });
                    return;
                }

                setmatricula(respuesta.data);
            } catch (error) {
                console.error("Error en la consulta del matricula:", error);
                setMensaje({ respuesta: "Error al obtener el matricula", tipo: "error" });
            }
        };

        if (id) consultarmatricula();
    }, [id]);

    return (
        <>
            {matricula ? (
                <Formulario_matri matricula={matricula} />
            ) : (
                mensaje.respuesta && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.respuesta}</p>
            )}
        </>
    )
}

export default Actualizar_matri