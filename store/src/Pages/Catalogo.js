import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
//import LeftMenuCategoria from '../Components/LeftMenuCategoria'
//import LeftMenuFiltroPrecio from '../Components/LeftMenuFiltroPrecio'
import RightResultado from '../Components/RightResultado'
import {useLocation} from "react-router-dom";



function Catalogo() {
  //const [filtroCategoria, setFiltroCategoria] = useState()
  //const [filtroPrecio, setFiltroPrecio] = useState()
  //const [queryString, setQueryString] = useState("")
  const [loading, setLoading] = useState(true)
  var queryString = "";
  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  if (query.get("find")){
    queryString = query.get("find")
  }
  useEffect( ()=>{
    
    /*if(query.get("categoria")){
      setFiltroCategoria(query.get("categoria"))
    }
    let precioFromQ = 0;
    let precioToQ = 99999999999999999;
    if(query.get("precioFrom")){
      precioFromQ = query.get("precioFrom")
    }
    if(query.get("precioTo")){
      precioToQ = query.get("precioTo")
    }
    setFiltroPrecio({precioFrom: precioFromQ, precioTo: precioToQ})*/
    
    setLoading(false)
  }
  ,[]);

  useEffect(()=>{
    return()=>{
      setLoading(true)
    }
  },[])

  return (
    <Container fluid>
        
            <RightResultado data={queryString} loading={loading}/>
          
    </Container>
  );
}

export default Catalogo;