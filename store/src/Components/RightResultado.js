import React, {useEffect, useState} from 'react';
import {Container, Button, Spinner} from 'react-bootstrap'
import CardProducto from '../Components/CardProducto'
import {getProductos,findProductos} from '../Services/ProductosService'

function RightResultado(props) {

  const [productosResultado, setProductosResultado] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  var findQuery = props.data;

  async function fetchProductos(){
    
    let result = await getProductos(page);
        if(result.data.docs.length>0){
            let update = productosResultado;
            update.push(...result.data.docs)
            setProductosResultado(update)
            setLoading(false)
            setHasNextPage(result.data.hasNextPage)
        }
  }
  async function fetchProductosByFind(find){
    
    let result = await findProductos(find);
        if(result.data.length>0){
            let update = productosResultado;
            update.push(...result.data)
            setProductosResultado(update)
            setLoading(false)
            setHasNextPage(false)
        }
  }
  useEffect( ()=>{
    
    if(findQuery ===""){
      
      fetchProductos();
    } else {
      console.log(findQuery)
      fetchProductosByFind(findQuery);
    }
    
  }
  ,[]);

  useEffect(()=>{
    return()=>{
      setProductosResultado([])
    }
  },[])

  const handleClick = async (e)=>{
    setPage(page+1);
    fetchProductos();
  }
  return (
    <Container className="overflow-auto" >
        {(loading && props.loading) &&
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
            </div>}
        {(!props.loading && !loading) && 
        <div>
        <br></br>
        <div>
        
          {productosResultado.map(producto=><CardProducto key={producto._id} data={producto} />)}
        
        </div>
        {hasNextPage &&<div style={{ textAlign: "center" }}><Button onClick={handleClick}>Cargar más</Button></div>
          
        }  
      </div>}   
    </Container>
  );
}

export default RightResultado;