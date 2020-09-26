import React, {useContext, useEffect, useState} from 'react';
import {Card, Button, Form, Container, Jumbotron} from 'react-bootstrap';
import NetContext from '../Context/NetContext'
import {getProductoById} from '../Services/ProductosService'
import {generarVenta} from '../Services/VentasService'


function Checkout() {
    const context = useContext(NetContext)
    const [producto, setProducto] = useState({})
    const [errorProducto, setErrorProducto] = useState(false)
    const [errorVenta, setErrorVenta] = useState(false)
    const [loading, setLoading] = useState(true);
    const [precio, setPrecio] = useState(0)
    const [compraFinalizada, setCompraFinalizada] = useState(false)
    var optionRef = React.createRef();
    useEffect( ()=>{
    
      fetchDetalleProducto();
    }
    ,[]);

    async function fetchDetalleProducto(){
      try{
        let result = await getProductoById(context.checkout.productoId);

      if(result.data){
        setProducto(result.data)
        if(result.data.enOferta){
          setPrecio(result.data.precioDeOferta)
        } else {
          setPrecio(result.data.precio)
        }
      } 
      } catch(e){
        setErrorProducto(true)
      } finally {
        setLoading(false)
      }
    }

    const handleClick  = async (event)=>{
      try {
        event.preventDefault();
        let dataVenta = {
          metodoPago: optionRef.current.value,
          detalle: {
            denominacion: producto.denominacion,
            SKU: producto.SKU,
            precio: precio,
            imagenes: producto.imagenes,
            cantidadVendida: context.checkout.cantidad,
            id_producto: producto._id
          }

      }
        let result = await generarVenta(dataVenta)
        
        console.log(result.data)
        if(result["data"]["dataMp"]){
            window.open(result["data"]["dataMp"]["body"]["init_point"],'_blank');
        }

        setCompraFinalizada(true)
      } catch(e){
        setErrorVenta(true)
      } finally {
        setLoading(false)
      }
  
    }


  return (
    <NetContext.Consumer>
        {context=>(
          <div>
            <br/>
            {context.login && <div>
            {(!compraFinalizada && context.checkout.cantidad>0) && <Card>
              <Card.Header as="h5">Checkout de tu compra</Card.Header>
              <Card.Body>
              <Card.Title>Producto: {context.checkout.denominacion}</Card.Title>
              <Card.Text>
                Precio: ${precio}
                <br/>
                Cantidad: {context.checkout.cantidad}
                <br/>
                Total: ${precio * context.checkout.cantidad}
                <br/>
              </Card.Text>
              <Form.Control as="select" ref={optionRef}>
                <option>Efectivo</option>
                <option>Mercadopago</option>
              </Form.Control>
              <br/>
              <Button variant="primary" onClick={handleClick}>Finalizar compra</Button>
              </Card.Body>
            </Card>}
            {compraFinalizada && <Container fluid>
              <Jumbotron fluid>
                      <Container>
                      <h1 style={{color: "green", fontWeight: 'bold'}}>Muchas gracias por tu compra!</h1>
                        
                      </Container>
              </Jumbotron>
            </Container>}
            {context.checkout.cantidad < 1 && <Container fluid>
              <Jumbotron fluid>
                      <Container>
                      <h1 style={{color: "red", fontWeight: 'bold'}}>Oops, parece que no seleccionaste un producto</h1>
                        
                      </Container>
              </Jumbotron>
            </Container>}
            
            </div>}
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

export default Checkout;