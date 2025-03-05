import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../Context/AuthProvider';

const Dashboard = () => {
  const [autenticado, setAutenticado] = useState(true); // Cambiar a tu lógica de autenticación
  const location = useLocation();
  const urlActual = location.pathname;

  const { auth } = useContext(AuthContext); // Estado de autenticación desde el contexto

  return (
    <div className="dashboard-container">
      
      <ul className="nabv">
        <p className="text-slate-400 text-center my-4 text-sm">
          <span className="bg-green-600 w-3 h-3 inline-block rounded-full"></span> Bienvenido - {auth.nombre || "Generico"}
        </p>
        <li className="text-center">
          <Link to='/dashboard/perfil' className={`${urlActual === '/dashboard/perfil' ? 'active' : ''}`}>Perfil</Link>
        </li>
        <li className="text-center">
          <Link to='/dashboard/materias' className={`${urlActual === '/dashboard/materias' ? 'active' : ''}`}>Materias</Link>
        </li>
        <li className="text-center">
          <Link to='/dashboard/estudiantes' className={`${urlActual === '/dashboard/estudiantes' ? 'active' : ''}`}>Estudiantes</Link>
        </li>
        <li className="text-center">
          <Link to='/dashboard/matriculas' className={`${urlActual === '/dashboard/matriculas' ? 'active' : ''}`}>Matriculas</Link>
        </li>
        <div>
          <Link to='/' onClick={() => { localStorage.removeItem("token") }}>Salir</Link>
        </div>
      </ul>

      <div className="content-area">
        {/* Si está autenticado, se renderiza el contenido dentro del Outlet */}
        {autenticado ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default Dashboard;