import React from 'react';
import {Button,Spinner} from 'react-bootstrap'
function ButtonWithLoading(props){
    
    return(
        <Button variant="primary" type={props.type?props.type:'submit'}  >
            {props.loading && 
                <Spinner animation="border" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            {props.text}
        </Button>
    )
}

export default ButtonWithLoading