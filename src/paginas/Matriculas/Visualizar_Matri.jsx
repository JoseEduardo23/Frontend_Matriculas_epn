import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from '../../components/Alerta/Mensaje';

const Visualizar_matri = () => {
  const { id } = useParams();
  const [matricula, setmatricula] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const consultarmatricula = async () => {
          try {
              const token = localStorage.getItem('token');
              if (!token) {
                  throw new Error("No se encontró el token de autenticación.");
              }
              
              const url = `http://localhost:3000/api/matricula/${id}`;
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
              setmatricula(respuesta.data.matricula || respuesta.data);

          } catch (error) {
              console.error(error);
              setMensaje({ respuesta: error.response?.data?.msg || error.message || "Error desconocido", tipo: false });
          } finally {
              setLoading(false);
          }
      };
      consultarmatricula();
  }, [id]);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (!matricula) {
      return (
          <div>
              <Mensaje tipo={false}>
                  {mensaje.respuesta || "matricula no encontrado."}
              </Mensaje>
          </div>
      );
  }

  const {
      usuario,
      materias,
      descripcion,
  } = matricula;

  return (
      <>
          <h1>Visualizar datos del matricula</h1>
          <div className="div-container">
              {matricula && Object.keys(matricula).length !== 0 ? (
                  <div className="visualizar-container">
                      {/* Mostrar las materias si están disponibles */}
                      <p className="text">
                          <span className="text-gray-600 uppercase font-bold">* Materias: </span>
                          {materias && materias.length > 0 ? (
                              materias.map((materia, index) => (
                                  <span key={index}>{materia.nombre || "Nombre no disponible"}{index < materias.length - 1 ? ", " : ""}</span>
                              ))
                          ) : (
                              "No hay materias disponibles"
                          )}
                      </p>
                      <p className="text">
                          <span className="text-gray-600 uppercase font-bold">* Estudiante: </span>
                          {usuario.nombre ? usuario.nombre : "Nombre no disponible"}
                          -
                          {usuario.apellido ? usuario.apellido : "Apellido no disponible"}
                      </p>

                      <p className="text">
                          <span className="text-gray-600 uppercase font-bold">* Cedula: </span>
                          {usuario.cedula ? usuario.cedula : "Cedula no disponible"}
                      </p>

                      <p className="text">
                          <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                          {descripcion ? descripcion : "Descripcion no disponible"}
                      </p>
                  </div>
              ) : (
                  <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta || "matricula no encontrada."}</Mensaje>
              )}
          </div>
      </>
  );
}
export default Visualizar_matri;