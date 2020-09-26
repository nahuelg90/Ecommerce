import React, {useContext} from 'react';
import {Card, Button} from 'react-bootstrap'
import NetContext from '../Context/NetContext'
import {Link, useHistory} from 'react-router-dom'


function CardProducto(producto) {
  let imageSource = "";
  if(producto.data.imagenes.length>0){
    imageSource = producto.data.imagenes[0].pathArchivo
  }
  const context = useContext(NetContext)
  const history = useHistory();

  function handleClick(event){
    context.putCheckout({
      cantidad: 1,
      denominacion: producto.data.denominacion,
      productoId: producto.data.id
    })
    history.push("/checkout")

  }

  return (
    <NetContext.Consumer>
    {context=>(
      <div>
            <br></br>
            <Card >
               
                  <Card.Img src={imageSource}  style={{ width: '18rem' , height: '18rem', marginLeft: "auto", marginRight: "auto" }}/>
                
                
                  <Card.Body>
                      <Card.Title>{producto.data.denominacion}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                          Precio: { producto.data.enOferta && <div><p style={{textDecoration: 'line-through'}}>${producto.data.precio}</p> <p style={{color: 'red', fontWeight: 'bold'}}>${producto.data.precioDeOferta}</p></div>} { !producto.data.enOferta && <p>${producto.data.precio}</p>} 
                          </Card.Subtitle>
                          <Card.Text>
                          Categoría: {producto.data.categoria.descripcion}
                          <br/>
                          {producto.data.descripcion}
                          </Card.Text>
                      {
                        producto.data.cantidad > 0 && <Button variant="success" disabled={!context.login} onClick={handleClick}>Comprar</Button>
                      }
                      {
                        !(producto.data.cantidad > 0) && <Button variant="danger" disabled={true}>Sin stock</Button>
                      }
                      
                      <Button variant="secondary" style={{marginLeft: '1rem'}} as={Link} to={'/producto/'+producto.data.id}>Detalle</Button>
                  </Card.Body>
                  {
                    !context.login &&
                    <Card.Footer>
                      <small className="text-muted">Debe estar logueado/a para poder comprar</small>
                    </Card.Footer>
                  }
                  
               
            </Card>
            <br></br>
       </div> )}
    </NetContext.Consumer>
  );
}

export default CardProducto;


    