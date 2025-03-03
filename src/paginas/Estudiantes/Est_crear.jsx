import React from 'react'
import { Formulario_est } from './Formulario_est'
const Est_crear = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Estudiantes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo Paciente</p>
            <Formulario_est />
        </div>
    )
}

export default Est_crear