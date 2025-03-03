import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from '../../components/Alerta/Mensaje';

const Visualizar_mat = () =>{
    const { id } = useParams();
    const [materia, setmateria] = useState(null);
    const [mensaje, setMensaje] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const consultarmateria = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No se encontró el token de autenticación.");
                }
                
                const url = `http://localhost:3000/api/materia/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);

                if (!respuesta || !respuesta.data) {
                    throw new Error("Respuesta vacía o no válida del servidor.");
                }

                console.log(respuesta.data);
                setmateria(respuesta.data.materia || respuesta.data);

            } catch (error) {
                console.error(error);
                setMensaje({ respuesta: error.response?.data?.msg || error.message || "Error desconocido", tipo: false });
            } finally {
                setLoading(false);
            }
        };
        consultarmateria();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!materia) {
        return (
            <div>
                <Mensaje tipo={false}>
                    {mensaje.respuesta || "materia no encontrado."}
                </Mensaje>
            </div>
        );
    }

    const {
        nombre,
        descripcion,
        estado,
        codigo,
        creditos,
    } = materia;

    return (
        <>
            <h1>Visualizar datos del materia</h1>
            <div className="div-container">
                {materia && Object.keys(materia).length !== 0 ? (
                    <div className="visualizar-container">
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Nombre: </span>
                            {nombre ? nombre : "Nombre no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                            {descripcion ? descripcion : "Descripcion no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                            {estado ? estado : "Estado no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Codigo: </span>
                            {codigo ? codigo : "Codigo no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Creditos: </span>
                            {creditos ? creditos : "Creditos no disponible"}
                        </p>
        
                    </div>
                ) : (
                    <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta || "materia no encontrado."}</Mensaje>
                )}
            </div>
        </>
    )
}

export default Visualizar_mat