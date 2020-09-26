import React, {useEffect, useState} from 'react';
import {Container, Button} from 'react-bootstrap'
import {getProductosDestacados} from '../Services/ProductosService'
import CardProducto from '../Components/CardProducto'

function Home() {

  const [loading, setLoading] = useState(true);
  const [productosHome, setProductosHome] = useState([])  
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false)

  async function fetchProductosDestacados(){
    
    let result = await getProductosDestacados(page);
        if(result.data.docs.length>0){
            let update = productosHome;
            update.push(...result.data.docs)
            setProductosHome(update)
            setLoading(false)
            setHasNextPage(result.data.hasNextPage)
        }
  }
  useEffect( ()=>{
    
    fetchProductosDestacados();
  }
  ,[]);

  const handleClick = async (e)=>{
    setPage(page+1);
    fetchProductosDestacados();
  }

  return (
    <Container>
                {
                    loading &&
                    <div>Loading ...</div>
                }
                {
                    !loading &&
                    <div>
                      <br></br>
                      <div>
                      
                        {productosHome.map(producto=><CardProducto key={producto._id} data={producto} />)}
                      
                      </div>
                      {hasNextPage &&<div style={{ textAlign: "center" }}><Button onClick={handleClick}>Cargar más</Button></div>
                        
                      }  
                    </div>
                }
    </Container>
  );
}

export default Home;