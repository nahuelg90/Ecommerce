import React from 'react';
import {Form} from 'react-bootstrap'


const styles = {
    errors:{
        backgroundColor:'red'
    },
    noError:{
        backgroundColor:'none'
    }
}
function FormGroup(props){

    return(
           <Form.Group controlId="formBasicName">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.change} style={(props.errors?styles.errors:styles.noError)}/>
                {props.errors && 
                    <Form.Text className="text-muted" >
                        {props.errors}
                    </Form.Text>
                }
            </Form.Group>
        
    )
}

export default FormGroup