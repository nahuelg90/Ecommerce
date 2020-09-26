import React, {useState,useEffect} from 'react';
import { Form,Button, Container} from 'react-bootstrap'
import FormGroup from '../Components/FormGroup'

function LeftMenuFiltroPrecio(props) {
  const [form,setForm] = useState(props.data.filtroPrecio)
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    console.log(props.data.filtroPrecio)
    setForm(props.data.filtroPrecio)
    console.log(form)    
    setLoading(false)
  }
  ,[]);

  const handleSubmit = (e)=>{

    let precioFromQ = 0;
    let precioToQ = 999999999999999999999;
    if(form.precioFrom !== ""){
      precioFromQ = form.precioFrom
    }
    if(form.precioTo !== ""){
      precioToQ = form.precioTo
    }
    props.data.setFiltroPrecio({precioFrom: precioFromQ, precioTo: precioToQ})
  }

  const handleChange = (e)=>{
    setForm({
        ...form,
        [e.target.name]:e.target.value}
    )
    e.preventDefault();
}
  return (
    <Container>
    {(!props.loading && !loading)&& <Form onSubmit={handleSubmit}>
                  
    <FormGroup label={'Precio desde'} type={'number'} name={'precioFrom'} value={form.precioFrom} change={handleChange}/>

    <FormGroup label={'Precio hasta'} type={'number'} name={'precioTo'} value={form.precioTo} change={handleChange}/>

    <Button type="sumbit">Filtrar</Button>
    
  </Form>

  }
    </Container>
            
  );
}

export default LeftMenuFiltroPrecio;