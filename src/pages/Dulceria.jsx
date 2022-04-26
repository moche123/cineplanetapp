import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2'
import palomitas from '../assets/palomitascine.jpg'
import imagrota from '../assets/imgnodisp.png';
import cargando from '../assets/cargando.gif';
import './styles/Dulceria.css';
import { Link } from 'react-router-dom';

function Dulceria({ isUserSignedIn, setIsUserSignedIn,precioFinal, setPrecioFinal, modeLogin,setModeLogin}) {
    const [val, setVal] = useState();
    const [encontrado, setEncontrado] = useState(false); //PARA NO GASTAR MEMORIA INNECESARIAMENTE

    //console.log('IN')
    function handleClickAdd(item) {
        console.log('CLICK')
        // e.preventDefault();
        setPrecioFinal(precioFinal + parseFloat(item.price))
        item.cantidad = item.cantidad + 1;
        //return <Navigate to="../dulceria" />;
    }

    function handleClickSubstract(item) {
        console.log('CLICK')
        // e.preventDefault();
        setPrecioFinal(precioFinal - parseFloat(item.price))
        item.cantidad = item.cantidad - 1;
        //return <Navigate to="../dulceria" />;
    }

    let getAnswer = async () => {
        //console.log('Encontrando')
        await fetch(`http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/candystore`)
            .then(response => response.json())
            .then(info => {
                setVal(info)
                info?.items?.forEach((res) => {
                    res.cantidad = 0;
                })
                setEncontrado(true)
            })
            .catch(err => setVal(err));




    };
    if (encontrado == false) {
        getAnswer();
    }
    // console.log(isUserSignedIn)




    if (isUserSignedIn == true  || modeLogin == 'invited') {
        console.log(modeLogin)
        let nombre = JSON.parse(localStorage.getItem('user'))?.displayNam || 'Invitado'
        // console.log(localStorage.getItem('saludo') == false)
        if (localStorage.getItem('saludo') == 'false') {

            Swal.fire({
                title: `Bienvenido ${nombre}!`,
                text: 'Encuentre de todo en nuestra dulcería',
                imageUrl: palomitas,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })
            localStorage.setItem('saludo', true)
        }

        if (val?.items) {

            return (


                <div className='w-full px-8 spacing_menu'>
                    <div className="cuenta">

                        <h1 className="font-bold text-5xl ml-5 text-blue-800">Dulcería</h1>

                        <div className="flex flex-wrap ml-5 mr-10 p-5 fixed mt-40 bg-yellow-400 text-gray-200 rounded-md preciofinal">

                                <h2 className="font-bold text-blue-800 text-3xl totalpreciofinal">Total: S./ {precioFinal}</h2>
                                <Link to="../pago" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10" >
                                    Continuar
                                </Link>


                        </div>
                    </div>


                    <hr />
                    <br />
                    <div className="w-full grid gap-5 md:gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 pl-1 md:pl-10 sm:pl-1 text-center">
                        {val.items.map((item, index) => (


                            <div key={index} className="contenido cursor-pointer bg-blue-800 rounded-lg border border-gray-200">
                                <img className="imagen"
                                    src={item.name}

                                    onError={({ currentTarget }) => {
                                        //currentTarget.onerror = null;
                                        currentTarget.src = 'https://blogdigital.es/wp-content/uploads/2015/09/imagen-no-encontrada.jpg';
                                    }} alt="" />
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">S/. {item.price}</h5>
                                    </a>
                                    <p className="mb-3 text-xl text-gray-100">{item.description} ({item.cantidad})</p>
                                    {/* <p className="mb-3 text-xl text-gray-700 dark:text-gray-400 hover:bg-black hover:text-white">Cantidad: {item.cantidad}</p> */}
                                    <p className="mb-3 text-xl text-white hover:bg-blue-500 hover:p-2 hover:text-white" onClick={() => handleClickAdd(item)}>
                                        <b>Aumentar</b></p>
                                    {
                                        item.cantidad > 0 ?
                                            <p className="mb-3 text-xl text-white dark:text-gray-400 hover:bg-red-600 hover:p-2 hover:text-white" disabled={item.cantidad < 0} onClick={() => handleClickSubstract(item)}>Disminuir</p>
                                            : null
                                    }
                                </div>
                            </div>


                        ))}



                    </div>
                </div>



            );
        } else {
            return (
                <div className='loading'>
                    <img src={cargando} alt="" />
                </div>
            );
        }
    } else {
        console.log(modeLogin)
        return <Navigate to="../login" />
    }
}

export default Dulceria;
