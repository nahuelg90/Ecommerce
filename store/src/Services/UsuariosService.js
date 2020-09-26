import instance from '../Config/axios'

export function registroUsuario(usuario){
    return instance.post('/usuarios/registro',usuario)
}

export function loginUsuario(usuario){
    return instance.post('/usuarios/login', usuario)
}

export function infoUsuario(){
    return instance.get('/usuarios')
}