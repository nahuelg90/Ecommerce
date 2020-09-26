import instance from '../Config/axios'

export function generarVenta(detalleVenta){
    return instance.post('/ventas/',detalleVenta)
}