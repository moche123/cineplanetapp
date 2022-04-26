import React, { useState } from "react";
import './styles/Home.css';
import imagrota from '../assets/imgrota.jpg';
import cargando from '../assets/cargando.gif';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';



function Home() {

 
    const [val, setVal] = useState();
    function handleClick(item){
        console.log(item)
        return <Navigate to="../dulceria" />;
    }
    const [encontrado, setEncontrado] = useState(false); //PARA NO GASTAR MEMORIA INNECESARIAMENTE



    let getAnswer = async () => {
        await fetch(`http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/premieres`)
            .then(response => response.json())
            .then(info => {
                setVal(info)
                setEncontrado(true)
            })
            .catch(err => setVal(err));


    };
    if (encontrado == false) {
        console.log('GO')
        getAnswer();
    }

    if (val?.premieres) {

        return (
            <div className='w-full px-4 spacing_menu'>
                <h1 className="font-bold text-5xl ml-5 text-blue-800">Premieres</h1>
                <hr />
                <br />

                <Link to="dulceria" className="grid gap-4 md:gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-center pl-1 md:pl-10 sm:pl-1 text-center">
                    {val.premieres.map((item, index) => (


                        <div href="#" onClick={()=>handleClick(item)} key={index} className="w-full bg-blue-800 flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-blue-600">
                            <img className="w-100 object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg object-scale-down"
                                src={item.image}

                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = imagrota;
                                }} alt="" />
                            <div className="w-full flex flex-col justify-end leading-normal">
                                <h5 className="mb-2 md:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.description}</h5>
                            </div>
                        </div>


                    ))}



                </Link>

                <br />
            </div>
            
        );
    } else {
        return (
            <div className='loading'>
                <img src={cargando} alt="" />
            </div>
        );
    }
}



export default Home;
