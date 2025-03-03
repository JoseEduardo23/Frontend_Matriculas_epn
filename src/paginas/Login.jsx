import React, { useState, useContext } from "react"; // Ensure useContext is imported from React
import axios from "axios";
import '../Estilos/Login.css';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from '../Context/AuthProvider'; // Import your AuthContext

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);  // Make sure to use the context properly

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/login`;
            const respuesta = await axios.post(url, form);
            localStorage.setItem("token", respuesta.data.token);
            setAuth(respuesta.data);
            console.log(respuesta);
            toast.success(respuesta.data.msg);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Login failed");
        }
    };

    return (
        <>
            <ToastContainer />
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="div-login">
                    <div>
                        <p>BIENVENIDOS</p>
                    </div>
                    <label className="form-input">Correo:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Ingresa tu correo"
                    />

                    <label className="form-input">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Tu contraseña"
                    />

                    <button type="submit" className="btn-login">Iniciar Sesion</button>
                </div>
            </form>
        </>
    );
};

export default Login;