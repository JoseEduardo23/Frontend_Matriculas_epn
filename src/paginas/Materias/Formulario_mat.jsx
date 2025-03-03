import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const Formulario_mat = ({ materia }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    estado: "",
    codigo: "",
    creditos: "",
  });

  useEffect(() => {
    if (materia?._id) {
      setForm({
        nombre: materia.nombre ?? "",
        descripcion: materia.descripcion ?? "",
        estado: materia.estado ?? "",
        codigo: materia.codigo ?? "", // Asegúrate que 'codigo' se mantenga como número si es necesario
        creditos: materia.creditos ?? "",
      });
    }
  }, [materia]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.estado || !form.codigo || !form.creditos) {
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

      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        estado: form.estado,
        codigo: form.codigo,  // Asegúrate de que 'codigo' sea numérico
        creditos: form.creditos,
      };

      if (materia?._id) {
        const url = `http://localhost:3000/api/materia/actualizar/${materia._id}`;
        await axios.put(url, data, { headers });
        toast.success("Actualización de materia completada");
      } else {
        const url = "http://localhost:3000/api/materia/crear";
        await axios.post(url, data, { headers });
        toast.success("Registro de materia completado");
      }

      navigate('/dashboard/materias/listar_mat');

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
          <p> En este módulo se pueden registrar o actualizar materias :) </p>
          <hr style={{ color: "gray" }} />
        </div>
        <form className="form-est" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            onChange={handleChange}
            value={form.nombre}
          />

          <label>Descripcion:</label>
          <textarea
            type="text"
            name="descripcion"
            id="descripcion"
            onChange={handleChange}
            value={form.descripcion}
          />

          <label>Estado:</label>
          <select name="estado" id="estado" onChange={handleChange} value={form.estado}>
            <option value="">Seleccione una opción</option>
            <option value="Reprobada">Reprobada</option>
            <option value="Aprobada">Aprobada</option>
            <option value="En curso">En curso</option>
          </select>

          <label>Codigo:</label>
          <input
            type="number"  // Asegúrate de que el tipo sea number
            name="codigo"
            id="codigo"
            onChange={handleChange}
            value={form.codigo}
          />

          <label>Creditos:</label>
          <input
            type="number"
            name="creditos"
            id="creditos"
            onChange={handleChange}
            value={form.creditos}
          />

          <input className="btn-est" type="submit" value={materia?._id ? "Actualizar" : "Registrar"} />
        </form>
      </div>
    </>
  );
};