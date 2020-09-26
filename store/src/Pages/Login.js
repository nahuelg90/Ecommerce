import React, {useState,useContext} from 'react';
import {Form, Container} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import {loginUsuario} from "../Services/UsuariosService"
import ButtonWithLoading from '../Components/ButtonWithLoading'
import FormGroup from '../Components/FormGroup'
import NetContext from '../Context/NetContext'

function Login() {
  const context = useContext(NetContext)
  const history = useHistory();
    const [form,setForm] = useState({email:'',password:''})
    //const [errors,setError] = useState({email:'',password:''})
    const [loading,setLoading] = useState(false)
    const  handleSubmit = async (e)=>{
      e.preventDefault();

     
      setLoading(true)
      let result = await loginUsuario(form);
      
      if(result.data.token){
          console.log(result.data)
          context.loginUser(result.data.token)
          //login(true);
          history.push("/")
          setLoading(false)
      }else{
          setLoading(false)
      }
  }
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value}
        )
        e.preventDefault();
    }
    return(
      <NetContext.Consumer>
        {context=>(
            <Container>
            <Form onSubmit={handleSubmit}>
                 
                <FormGroup label={'Email'} type={'email'} placeholder={'Ingrese su email'} name={'email'} value={form.email} change={handleChange}/>

                <FormGroup label={'Contraseña'} type={'password'} placeholder={'Ingrese su password'} name={'password'} value={form.password} change={handleChange}/>

                <ButtonWithLoading text={'Iniciar sesión'} loading={loading} />
                
            </Form>
        </Container>
        )}
        </NetContext.Consumer>
        
    )
}

export default Login;