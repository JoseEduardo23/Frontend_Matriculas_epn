import React, { useState, useEffect } from "react";
import '../../Estilos/Crear_Esto.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const Formulario_est = ({ estudiante }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        cedula: "",
        fecha_nacimiento: ""
    });

    useEffect(() => {
        if (estudiante?._id) {
            setForm({
                nombre: estudiante.nombre ?? "",
                apellido: estudiante.apellido ?? "",
                email: estudiante.email ?? "",
                celular: estudiante.celular ? String(estudiante.celular) : "",
                cedula: estudiante.cedula ? String(estudiante.cedula) : "",
                fecha_nacimiento: estudiante.fecha_nacimiento ? estudiante.fecha_nacimiento.split('T')[0] : "" // Ajusta la fecha aquí
            });
        }
    }, [estudiante]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.apellido || !form.email || !form.celular || !form.cedula || !form.fecha_nacimiento) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("No se ha encontrado un token válido");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const formData = {
                ...form,
                celular: String(form.celular),
                cedula: String(form.cedula),
            };


            if (estudiante?._id) {
                const url = `http://localhost:3000/api/usuario/actualizar/${estudiante._id}`;
                await axios.put(url, formData, { headers });
                toast.success("Actualización de estudiante completada");
                navigate('/dashboard/estudiantes/listar_est')
            } else {
                const url = "http://localhost:3000/api/usuario/crear";
                await axios.post(url, formData, { headers });
                toast.success("Registro de estudiante completado");
                navigate('/dashboard/estudiantes/listar_est');
            }
        } catch (error) {
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                toast.error(error.response.data.mensaje || "Error en la solicitud", { autoClose: 2000 });
            } else {
                console.error("Error inesperado:", error.message);
                toast.error("Error inesperado en la solicitud", { autoClose: 2000 });
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container-est">
                <div className="title-est">
                    <p> En este módulo se pueden registrar o actualizar estudiantes :) </p>
                    <hr style={{ color: "gray" }} />
                </div>
                <form className="form-est" onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" id="nombre" onChange={handleChange} value={form.nombre} />

                    <label>Apellido:</label>
                    <input type="text" name="apellido" id="apellido" onChange={handleChange} value={form.apellido} />

                    <label>Email:</label>
                    <input type="email" name="email" id="email" onChange={handleChange} value={form.email} />

                    <label>Celular:</label>
                    <input type="text" name="celular" id="celular" onChange={handleChange} value={form.celular} />

                    <label>Cédula:</label>
                    <input type="text" name="cedula" id="cedula" onChange={handleChange} value={form.cedula} />

                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={handleChange} value={form.fecha_nacimiento} />

                    <input className="btn-est" type="submit" value={estudiante?._id ? "Actualizar" : "Registrar"} />
                </form>
            </div>
        </>
    );
};