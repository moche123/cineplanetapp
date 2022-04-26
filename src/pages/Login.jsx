import React, { useState } from "react";
import { signInWithGoogle } from "../config/firebase";
import { useAlert } from 'react-alert'
import { Navigate } from "react-router-dom";
import './styles/Login.css';
import cineplanetlogo from '../assets/cineplanet_logo.svg'

function Login({ isUserSignedIn, setIsUserSignedIn,modeLogin,setModeLogin }) {
    const alert = useAlert()
    




    async function verify() {
        const result = await signInWithGoogle();
        console.log(result)
        if (result) {
            alert.show('Correctamente logueado!', 'success')

            setIsUserSignedIn(true)
            localStorage.setItem('isUserSignedIn', true)
            
            localStorage.setItem('user', JSON.stringify(result.user))


        } else {
            alert.show('Error al loguearse!', 'error')


        }



    }

    async function invited() {
        setIsUserSignedIn(false)
        await localStorage.setItem('isUserSignedIn', false)

        setModeLogin('invited')
        await localStorage.setItem('modeLogin', 'invited')
        //localStorage.setItem('user', JSON.stringify(result.user))
    }


    //console.log(localStorage.getItem('isUserSignedIn'))
    if (isUserSignedIn == false && modeLogin == 'nothing') {

        return (
            <div className="flex justify-center items-center min-h-screen bg-blue-500 page">
                <div className="h-auto w-80 bg-white p-5 rounded-lg flexo">
                    <img src={cineplanetlogo} alt="" width={'50px'} />

                    <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={verify}>Google</button>
                    <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full" onClick={invited}>Invitado</button>

                </div>
                {/* <div className='w-full flex items-center px-4 spacing_menu'>
                </div> */}
            </div>
        );
    } else {
        return <Navigate to="../dulceria" />
    }
}

export default Login;
