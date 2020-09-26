import React, {useState} from 'react';
import {Form, Container} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import {registroUsuario} from "../Services/UsuariosService"
import ButtonWithLoading from '../Components/ButtonWithLoading'
import FormGroup from '../Components/FormGroup'

function Registro() {
  const history = useHistory();
    const [form,setForm] = useState({nombre:'',apellido:'',email:'',password:''})
    const [errors,setError] = useState({nombre:'',apellido:'',email:'',password:''})
    const [loading,setLoading] = useState(false)
    
    const handleSubmit = async (e)=>{
        
        if(form.name==""){
            setError({
                ...errors,
                name:'El nombre es obligatorio'
            })
        }
        setLoading(true)
        registroUsuario(form)
        .then((result)=>{
            
            history.push("/login")
        })

        
        
        
        e.preventDefault();
    }
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value}
        )
        e.preventDefault();
    }
    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup label={'Nombre'} type={'text'} placeholder={'Ingrese su nombre'} name={'nombre'} value={form.nombre} change={handleChange} errors={errors.nombre}/>

                <FormGroup label={'Apellido'} type={'text'} placeholder={'Ingrese su apellido'} name={'apellido'} value={form.apellido} change={handleChange} errors={errors.apellido}/>
                
                <FormGroup label={'Email'} type={'email'} placeholder={'Ingrese su email'} name={'email'} value={form.email} change={handleChange}/>

                <FormGroup label={'Contraseña'} type={'password'} placeholder={'Ingrese su password'} name={'password'} value={form.password} change={handleChange}/>

                <ButtonWithLoading text={'Registrarse'} loading={loading} />
                
            </Form>
        </Container>
    )
}

export default Registro;