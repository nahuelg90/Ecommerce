import React  from 'react';
import {Card} from 'react-bootstrap'

function CardVenta(venta){
    console.log(venta)
    let imageSource = "";
    if(venta.data.detalle.imagenes.length>0){
        imageSource = venta.data.detalle.imagenes[0].pathArchivo
    }
    return(
        <Card>
            <Card.Img src={imageSource}  style={{ width: '18rem' , height: '18rem', marginLeft: "auto", marginRight: "auto" }}/>
                
                
                <Card.Body>
                    <Card.Title>{venta.data.detalle.denominacion}</Card.Title>
                        <Card.Text>
                        Fecha de compra: {venta.data.fecha}
                        <br/>
                        Precio unitario: $ {venta.data.detalle.precio}
                        <br/>
                        Cantidad comprada: {venta.data.detalle.cantidadVendida}
                        <br/>
                        Total: $ {venta.data.importe}
                        <br/>
                        Estado de pago: {venta.data.estadoDePago}
                        <br/>
                        Método de pago: {venta.data.metodoPago}
                        </Card.Text>
                    
                </Card.Body>
        </Card>
    );
}

export default CardVenta;
