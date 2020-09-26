import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom' // lo tuve que instalar dos veces para que lo tome 
import { Navbar,  Nav,Form,Button,FormControl, NavDropdown} from 'react-bootstrap';
import NetContext from '../Context/NetContext'

function Menu(){

    let textInput = React.useRef(null);
    const [redirectTo, setRedirectTo] = useState()

    function handleClick(event){
        let input = textInput.current.value
        input = input.replace(/ /g,",")
        
        event.preventDefault();
        event.stopPropagation();
        redirectSearch(input)
    }

    function handleOnKey(event){
        // lo tuve que sacar porque se estaba activando 2 veces
          if (event.key === "Enter" || event.keyCode === 13) {
            let input = textInput.current.value
            input = input.replace(/ /g,",")
            
            event.preventDefault();
            event.stopPropagation();
            redirectSearch(input)
          }
        
    
    }

    function redirectSearch(input){
        setRedirectTo("/catalogo?find="+input)
    }

    return(
        <NetContext.Consumer>
        {context=>(
            <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {
                        context.login &&
                        <>
                        <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                        <Nav.Link as={Link} to={'/catalogo'}>Catálogo</Nav.Link>
                        <NavDropdown title="Usuario" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/cuenta'}>Mi cuenta</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={context.logoutUser}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        </>
                    }
                    {
                        !context.login &&
                        <>
                            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                            <Nav.Link as={Link} to={'/catalogo'}>Catálogo</Nav.Link>
                            <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                            <Nav.Link as={Link} to={'/registro'}>Registro</Nav.Link>
                            
                        </>
                    }
                </Nav>
                <Form inline>
                        <FormControl type="text" placeholder="Búsqueda" className="mr-sm-2" ref={textInput} /*onKeyUp={handleOnKey}*//>
                        <Button variant="outline-success" onClick={handleClick}>Buscar</Button>
                        {redirectTo && <Redirect to={redirectTo} />}
                </Form>
            </Navbar.Collapse>
            </Navbar>
        )}
        </NetContext.Consumer>

    )
}


export default Menu