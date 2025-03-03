import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import Login from './paginas/Login';
import { AuthProvider } from './Context/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Perfil from './paginas/Perfil';

/*- Estudiantes -*/
import Estudiantes from './paginas/Estudiantes/Estudiantes';
import Est_crear from './paginas/Estudiantes/Est_crear';
import Listar_est from './paginas/Estudiantes/Listar_est';
import Actualizar_Est from './paginas/Estudiantes/Actualiza_Est';
import Visualizar_est from './paginas/Estudiantes/Visualizar_est';

/*- Materias -*/
import Materia from './paginas/Materias/Materias';
import Mat_crear from './paginas/Materias/Mat_crear';
import Listar_mat from './paginas/Materias/Listar_mat';
import Actualizar_Materia from './paginas/Materias/Acrualiar_Materia';
import Visualizar_mat from './paginas/Materias/Visualizar_mat';

/*- Matriculas -*/
import Matricula from './paginas/Matriculas/Matriculas';
import Matri_crear from './paginas/Matriculas/Matri_crear';
import Actualizar_matri from './paginas/Matriculas/Actualizar_matri';
import Listar_matri from './paginas/Matriculas/Listar_matri';
import Visualizar_matri from './paginas/Matriculas/Visualizar_Matri';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard/*" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path="perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />

            <Route path="materias" element={<PrivateRoute><Materia /></PrivateRoute>} >
              <Route path="mat_crear" element={<PrivateRoute><Mat_crear /></PrivateRoute>} />
              <Route path="listar_mat" element={<PrivateRoute><Listar_mat /></PrivateRoute>} />
              <Route path="actualizar_materia/:id" element={<PrivateRoute><Actualizar_Materia /></PrivateRoute>} />
              <Route path="visualizar_mat/:id" element={<PrivateRoute><Visualizar_mat /></PrivateRoute>} />
            </Route>

            <Route path="estudiantes" element={<PrivateRoute><Estudiantes /></PrivateRoute>} >
              <Route path="est_crear" element={<PrivateRoute><Est_crear /></PrivateRoute>} />
              <Route path="listar_est" element={<PrivateRoute><Listar_est /></PrivateRoute>} />
              <Route path="actualizar_est/:id" element={<PrivateRoute><Actualizar_Est /></PrivateRoute>} />
              <Route path="visualizar_est/:id" element={<PrivateRoute><Visualizar_est /></PrivateRoute>} />
            </Route>

            <Route path="matriculas" element={<PrivateRoute><Matricula /></PrivateRoute>} >
              <Route path="matri_crear" element={<PrivateRoute><Matri_crear /></PrivateRoute>} />
              <Route path="listar_matri" element={<PrivateRoute><Listar_matri /></PrivateRoute>} />
              <Route path="actualizar_matri/:id" element={<PrivateRoute><Actualizar_matri /></PrivateRoute>} />
              <Route path="visualizar_matri/:id" element={<PrivateRoute><Visualizar_matri /></PrivateRoute>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;