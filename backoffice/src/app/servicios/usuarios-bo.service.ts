import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosBoService {

  authState = new BehaviorSubject(false);

  constructor(private http:HttpClient, private router: Router) {
    let token = localStorage.getItem('token')
    if(token){
      if (!this.tokenExpired(token)){
        this.authState.next(true)
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  registrarUsuario(usuario){
    return this.http.post(environment.endpoint+"/usuarios-bo/registro",usuario);
  }

  loginUsuario(usuario){
    console.log("login usuario")
    return this.http.post(environment.endpoint+"/usuarios-bo/login",usuario);
  }

  logout(){
    localStorage.removeItem('token');
    this.authState.next(false)
    console.log("logout")
    this.router.navigate(['/login'])
  }
  authenticate(){
    //Cambiar el estado a true
    this.authState.next(true)
  }

  isAuthenticated(){
    //Retornar estado del login
    return this.authState
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
