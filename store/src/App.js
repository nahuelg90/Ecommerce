import React from 'react';
import './App.css';
//import { Button } from 'react-bootstrap';

import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Registro from './Pages/Registro'
import PanelUsuario from './Pages/PanelUsuario'
import {BrowserRouter,Route} from "react-router-dom"
import Menu from "./Layout/Menu"
//import NetContext from './Context/NetContext'
import GlobalState from './Context/GlobalState'
import VentaDetalle from './Pages/VentaDetalle';
import ProductoDetalle from './Pages/ProductoDetalle';
import Checkout from './Pages/Checkout';
import Catalogo from './Pages/Catalogo';

function App() {
  return (
    <GlobalState>
        <BrowserRouter>
          <Route component={()=><Menu />} />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={()=><Login  />} />
          <Route path="/registro" exact component={Registro} />
          <Route path="/cuenta" exact component={PanelUsuario} />
          <Route path="/catalogo" exact component={Catalogo} />
          <Route path="/venta/:id" exact component={VentaDetalle} />
          <Route path="/producto/:id" exact component={ProductoDetalle} />
          <Route path="/checkout" exact component={Checkout} />
        </BrowserRouter>
    </GlobalState>
  );
}

export default App;
