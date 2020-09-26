import React, {useEffect, useState} from 'react';
import {Card, Container, Jumbotron,ListGroup} from 'react-bootstrap';
import {infoUsuario} from "../Services/UsuariosService"
import NetContext from '../Context/NetContext'
import CardVenta from '../Components/CardVenta'

function PanelUsuario() {

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [errorProducto, setErrorProducto] = useState(false)
  const [comprasRealizadas, setComprasRealizadas] = useState([])

  
  useEffect( ()=>{
    
    fetchDetalleUsuario();
  }
  ,[]);

  async function fetchDetalleUsuario(){
    try{
      let result = await infoUsuario();
      console.log(result)
      if(result.data){
        setUsuario(result.data)
        console.log(result.data.comprasRealizadas.length)
        if(result.data.comprasRealizadas.length>0){
          
          let comprasRealizadasAux = []
          var i = 0;
          for (i =0; i < result.data.comprasRealizadas.length; i++){
            
            comprasRealizadasAux.push(<ListGroup.Item><CardVenta key={result.data.comprasRealizadas[i]._id} data={result.data.comprasRealizadas[i]} /></ListGroup.Item>)
          }
          setComprasRealizadas(comprasRealizadasAux)
          console.log(comprasRealizadas)

        }
      } 
    } catch(e){
      setErrorProducto(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <NetContext.Consumer>
        {context=>(
          <div>
            <br/>
            {context.login && <Container fluid>

            <Card>
              <Card.Body>
                <Card.Title>{usuario.nombre+" "+usuario.apellido}</Card.Title>
                
                <Card.Text>
                  Email: {usuario.email}
                </Card.Text>
                
              </Card.Body>
            </Card>
            <br/>
              Compras realizadas:
            <br/>  
            <ListGroup>
              {comprasRealizadas}
            </ListGroup>
            </Container>}
           
            {!context.login && <Container fluid>
              <Jumbotron fluid>
                      <Container>
                      <h1 style={{color: "red", fontWeight: 'bold'}}>Oops, parece que no estás logueado/a</h1>
                        
                      </Container>
              </Jumbotron>
            </Container>}
          </div>
            
        )}
    </NetContext.Consumer>
  );
}

export default PanelUsuario;