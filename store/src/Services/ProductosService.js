import instance from '../Config/axios'

export function getProductos(page){
    let query = ""
    if(page){
        query ="/?page="+page
    }
    return instance.get('/productos'+query)
}

export function getProductosDestacados(page){
    let query = ""
    if(page){
        query ="/?page="+page
    }
    return instance.get('/productos/destacados'+query)
}


export function findProductos(consulta){

    return instance.get('/productos/find/'+consulta)
}

export function getProductoById(id){
    return instance.get('/productos/'+id)
}
