import React, {useContext, useState, useEffect} from 'react';
import {Container, Col, Jumbotron, Spinner,Row,Carousel,Form,Button} from 'react-bootstrap'
import {getProductoById} from '../Services/ProductosService'
import CarouselImagen from '../Components/CarouselImagen'
import NetContext from '../Context/NetContext'
import { useParams, useHistory } from "react-router-dom";


function ProductoDetalle (){
 
  const [producto, setProducto] = useState({})
  const [errorProducto, setErrorProducto] = useState(false)
  const [loading, setLoading] = useState(true);
  let {id} =  useParams();
  const productoId = id

  var optionRef = React.createRef();
  const context = useContext(NetContext)
  const history = useHistory();
  

  useEffect( ()=>{
    
    fetchDetalleProducto();
  }
  ,[]);

  async function fetchDetalleProducto(){
    try{
      let result = await getProductoById(productoId);

    if(result.data){
      setProducto(result.data)
    } 
    } catch(e){
      setErrorProducto(true)
    } finally {
      setLoading(false)
    }
    
    
  }

  function handleClick(event){
    context.putCheckout({
      cantidad: optionRef.current.value,
      denominacion: producto.denominacion,
      productoId: productoId
    })
    history.push("/checkout")

  }
  const options = []
  var i = 1;
  for (i =1; i < producto.cantidad; i++){
  options.push(<option>{i}</option>)
  }
  return(
    <NetContext.Consumer>
      {context=>(
          <Container fluid>
          {
            loading &&
            <div style={ {
              flex: 1,
              marginTop:240,
              justifyContent: 'center',
              alignItems:'center'
          }}>
            <Spinner animation="border" role="status" style={{
                flex: 1,
                alignSelf:'center'
            }}>
              <span className="sr-only">Cargando...</span>
            </Spinner>
            </div>
          }
          {
            (!loading && errorProducto)&& <Container fluid>
              <Jumbotron fluid>
                      <Container>
                      <h1 style={{color: "red", fontWeight: 'bold'}}>Producto no encontrado</h1>
                        
                      </Container>
              </Jumbotron>
            </Container>
          }
          {
              (!loading && !errorProducto)&&
              <div>
                <Row>
                  <Col sm={7}>
                    <Container>
                    
                    <Jumbotron fluid>
                      <Container>
                      <h1>{producto.denominacion}</h1>
                        
                      </Container>
                    </Jumbotron>
                    <br></br>
                    { producto.imagenes.length > 0 && <Carousel>
                      {producto.imagenes.map(imagen=><CarouselImagen key={imagen.pathArchivo} data={imagen} />)}
                    </Carousel>}
                    
                    Precio: { producto.enOferta && <div><p style={{textDecoration: 'line-through'}}>${producto.precio}</p> <p style={{color: 'red', fontWeight: 'bold'}}>${producto.precioDeOferta}</p></div>} { !producto.enOferta && <p>${producto.precio}</p>} 
                    <br></br>
                    Categoria: {producto.categoria.descripcion}
                    <br/>
                    Descripción del producto: {producto.descripcion}
                    </Container>
                  </Col>
                  <Col sm={5}>
                  <Form>
                    <Form.Group controlId="purchaseForm.controlCantidad" >
                      <Form.Label>Cantidad a comprar</Form.Label>
                      <Form.Control as="select" ref={optionRef}>
                        {options}
                      </Form.Control>
                    </Form.Group>
                    {
                          producto.cantidad > 0 && <Button variant="success" disabled={!context.login} onClick={handleClick}>Comprar</Button>
                        }
                        {
                          !(producto.cantidad > 0) && <Button variant="danger" disabled={true}>Sin stock</Button>
                        }
                  </Form>
                  </Col>
                </Row>
              </div>
          }
              
              
          </Container>
      )}
    </NetContext.Consumer>
    
  )
  
}

export default ProductoDetalle;