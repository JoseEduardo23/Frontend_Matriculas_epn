import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import '../../Estilos/Formulariomatri.css'
const FormularioMatricula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cedula, setCedula] = useState("");
    const [codMat, setCodMat] = useState("");
    const [estudiante, setEstudiante] = useState(null);
    const [materia, setMateria] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [matricula, setMatricula] = useState(null);
    const [form, setForm] = useState({
        descripcion: "",
    });

    useEffect(() => {
        if (id) {
            const cargarMatricula = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const url = `http://localhost:3000/api/matricula/${id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const respuesta = await axios.get(url, options);

                    if (respuesta.data) {
                        setMatricula(respuesta.data);
                        setForm({ descripcion: respuesta.data.descripcion });

                        if (respuesta.data.usuario) {
                            setEstudiante(respuesta.data.usuario);
                            setCedula(respuesta.data.usuario.cedula);
                        }

                        if (respuesta.data.materias && respuesta.data.materias.length > 0) {
                            setMateria(respuesta.data.materias[0]);
                            setCodMat(respuesta.data.materias[0].codigo);
                        }
                    }
                } catch (error) {
                    console.error("Error al cargar la matrícula:", error);
                    toast.error("Error al cargar la matrícula.");
                }
            };
            cargarMatricula();
        }
    }, [id]);

    const buscarEstudiante = async () => {
        setMensaje("");

        if (!cedula.trim()) {
            setMensaje("Por favor, ingrese una cédula válida.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:3000/api/usuario/usuarios";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const respuesta = await axios.get(url, options);
            console.log("Respuesta del servidor:", respuesta.data);

            if (!Array.isArray(respuesta.data)) {
                setMensaje("Error: La respuesta no es una lista de usuarios.");
                return;
            }

            const estudianteEncontrado = respuesta.data.find(
                (user) => user.cedula.toString().trim() === cedula.trim()
            );

            if (estudianteEncontrado) {
                setEstudiante(estudianteEncontrado);
                toast.success("Estudiante encontrado con éxito.");
            } else {
                setEstudiante(null);
                toast.error("Estudiante no encontrado.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.error("Error al buscar el estudiante.");
        }
    };

    const buscarMateria = async () => {
        setMensaje("");

        if (!codMat.trim()) {
            setMensaje("Por favor, ingrese un código de materia válido.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:3000/api/materia/materias";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const respuesta = await axios.get(url, options);

            if (!Array.isArray(respuesta.data)) {
                setMensaje("Error: La respuesta no es una lista de materias.");
                return;
            }

            const materiaEncontrada = respuesta.data.find(
                (mat) => mat.codigo.toString().trim() === codMat.trim()
            );

            if (materiaEncontrada) {
                setMateria(materiaEncontrada);
                toast.success("Materia encontrada.");
            } else {
                setMateria(null);
                toast.error("Materia no encontrada.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.error("Error al buscar la materia.");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!estudiante || !materia) {
            toast.error("Por favor, asegúrese de que el estudiante y la materia estén encontrados.");
            return;
        }

        if (!form.descripcion.trim()) {
            toast.error("Por favor, ingrese una descripción válida.");
            return;
        }

        const dataToSubmit = {
            usuario: estudiante._id,
            materias: [materia._id],
            descripcion: form.descripcion
        };
        console.log("Datos a enviar:", dataToSubmit);

        try {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            let url;
            let metodo;
            if (matricula?._id) {
                url = `http://localhost:3000/api/matricula/actualizar/${matricula._id}`;
                metodo = axios.put;
            } else {
                url = "http://localhost:3000/api/matricula/crear";
                metodo = axios.post;
            }

            const respuesta = await metodo(url, dataToSubmit, { headers });
            toast.success(matricula?._id ? "Matrícula actualizada con éxito." : "Registro de matrícula completado.");
            navigate('/dashboard/matriculas/listar_matri');
        } catch (error) {
            console.error("Error en la solicitud:", error.response?.data || error.message);
            toast.error(error.response?.data?.msg || "Error en la solicitud");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="matricula-form">
                    <div className="form-group">
                        <div>
                            <label className="form-label">Cédula del estudiante</label>
                            <input
                                type="text"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                className="input-field"
                            />
                            <button type="button" onClick={buscarEstudiante} className="search-button">
                                Buscar Estudiante
                            </button>
                        </div>

                        {/* Mostrar detalles del estudiante */}
                        {estudiante && (
                            <div className="student-details">
                                <h3>Detalles del Estudiante:</h3>
                                <p><strong>Nombre:</strong> {estudiante.nombre} {estudiante.apellido}</p>
                                <p><strong>Cédula:</strong> {estudiante.cedula}</p>
                                <p><strong>Email:</strong> {estudiante.correo}</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <div>
                            <label className="form-label">Código de la materia</label>
                            <input
                                type="text"
                                value={codMat}
                                onChange={(e) => setCodMat(e.target.value)}
                                className="input-field"
                            />
                            <button type="button" onClick={buscarMateria} className="search-button">
                                Buscar Materia
                            </button>
                        </div>

                        {/* Mostrar detalles de la materia */}
                        {materia && (
                            <div className="materia-details">
                                <h3>Detalles de la Materia:</h3>
                                <p><strong>Materia:</strong> {materia.nombre}</p>
                                <p><strong>Código:</strong> {materia.codigo}</p>
                                <p><strong>Descripción:</strong> {materia.descripcion}</p>
                            </div>
                        )}
                    </div>

                    {mensaje && <p className={`message ${estudiante || materia ? "success" : "error"}`}>{mensaje}</p>}

                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <input className="submit-btn" type="submit" value={matricula?._id ? "Actualizar" : "Registrar"} />
                </form>
            </div>
        </>
    );
};

export default FormularioMatricula;