import React, { Component } from 'react';
import NetContext from './NetContext';

class GlobalState extends Component{
    state={
        login:localStorage.getItem('login'),
        checkout: {
            cantidad: 0,
            denominacion: "",
            productoId: ""
        }
    }
    loginUser = token=>{
        this.setState({
            login:true
        })
        localStorage.setItem('token',token)
        localStorage.setItem('login',this.state.login)
    }
    logoutUser = data=>{
        this.setState({
            login:false
        })
        localStorage.removeItem('login')
        localStorage.removeItem('token')
    }

    putCheckout = elCheckout=>{
        this.setState({checkout: elCheckout})
    }
    checkoutFinish = data=>{
        this.setState({checkout: {
            cantidad: 0,
            denominacion: "",
            productoId: ""
        }})
    }
    render(){
        return(
            <NetContext.Provider 
                value={{
                    login:this.state.login,
                    checkout: this.state.checkout,
                    loginUser:this.loginUser,
                    logoutUser:this.logoutUser,
                    putCheckout: this.putCheckout,
                    checkoutFinish: this.checkoutFinish
                }}>
                {this.props.children}    
            </NetContext.Provider>
        )
    }
}
export default GlobalState;