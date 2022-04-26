import React from "react";
import './styles/Pago.css';
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom";
import { useAlert } from 'react-alert'
// import regex from '../config/regex'

function Pago({ isUserSignedIn, setIsUserSignedIn, precioFinal, setPrecioFinal }) {
  /*
    número de tarjeta de 16 dígitos
 Fecha de expiración
 CVV
 Correo electrónico
 Nombre
 Tipo de documento y número de documento
  */
  const alert = useAlert()

  const [goHome, setGoHome] = React.useState(false);
  const [values, setValues] = React.useState({
    numeroTarjeta: "",
    fechaexpiracion: "",
    cvv: "",
    correo: JSON.parse(localStorage.getItem('user')).email || "",
    nombre: JSON.parse(localStorage.getItem('user')).displayName || "",
    tipodocumento: "DNI",
    numerodocumento: "",
  });

  function handleSubmit(evt) {

    evt.preventDefault();
    console.log("Form submitted:", values);
    alert.show('Espere...', 'success')

    let urlPayment = {
      name: 'ValidResetCode',
      mail: values.correo,
      dni: values.numerodocumento,
      operation_date: '123456789'
    }


    fetch(`http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/complete`,
      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(urlPayment), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return response.json()
      })
      .then(info => {
        console.log(info)
        Swal.fire({
          title: `Compra exitosa!`,
          text: 'Su compra fue realizada correctamente',
          imageWidth: 400,
          imageHeight: 200,

        })
        setPrecioFinal(0)
        //localStorage.setItem('saludo', false);
        setGoHome(true)
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          title: `Error!`,
          text: 'Su compra no pudo ser realizada',
          imageWidth: 400,
          imageHeight: 200,

        })
      });


  }
  if (goHome) {
    return <Navigate to="/" />
  } else {
    console.log('cargando')
  }
  function handleChange(evt) {

    let { target } = evt;
    let { name, value } = target;
    
    switch(name){
      
      case 'numeroTarjeta':
        value = value.replace(/[^0-9]/g, '')
        if(value.length > 16){
          return
        }
        break;
      case 'fechaexpiracion':
        if(value.length > 5){
          return
        }
        break;
      case 'cvv':
        value = value.replace(/[^0-9]/g, '')
        if(value.length > 3){
          return
        }
        break;
      case 'numerodocumento':
        
        value = value.replace(/[^0-9]/g, '')
        if(value.length > 8){
          return
        }
        break;
      default:
        break;
    }

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }

  return (
    <div>

      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="numeroTarjeta">Tarjeta</label>
        <input
          id="numeroTarjeta"
          name="numeroTarjeta"
          type="password"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="fechaexpiracion">Fecha de expiracion</label>
        <input
          id="fechaexpiracion"
          name="fechaexpiracion"
          type="date"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form> */}


      <form onSubmit={handleSubmit}>

        <div className="flex justify-center items-center min-h-screen bg-blue-500 page">
          <div className="h-auto w-80 bg-white p-5 rounded-lg">
            <p className="text-xl font-semibold">Detalles de  pago</p>
            <div className="input_text mt-6">
              <span className=" left-0 text-sm -top-4">Nombre del propietario</span>
              <input id="nombre"
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="Moisés Miguel" required />
              <i className=" left-2 top-4 text-gray-400 fa fa-user"></i>
            </div>

            <div className="input_text mt-6">
              <span className=" left-0 text-sm -top-4">Correo</span>
              <input id="correo"
                name="correo"
                type="text"
                value={values.correo}
                onChange={handleChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="correo@gmail.com" required />
              <i className=" left-2 top-4 text-gray-400 fa fa-user"></i>
            </div>

            <div className="input_text mt-6">
              <span className=" left-0 text-sm -top-4">Tipo de documento</span>
              <input id="tipodocumento"
                name="tipodocumento"
                type="text"
                value={values.tipodocumento}
                onChange={handleChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="DNI" required />
              <i className=" left-2 top-4 text-gray-400 fa fa-user"></i>
            </div>


            <div className="input_text mt-6">
              <span className=" left-0 text-sm -top-4">Número de documento</span>
              <input id="numerodocumento"
                name="numerodocumento"
                type="text"
                value={values.numerodocumento}
                onChange={handleChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="78451285" required />
              <i className=" left-2 top-4 text-gray-400 fa fa-user"></i>
            </div>

            <div className="input_text mt-8">
              <span className=" left-0 text-sm -top-4">Número de tarjeta</span>
              <input
                id="numeroTarjeta"
                name="numeroTarjeta"
                type="text"
                value={values.numeroTarjeta}
                onChange={handleChange}
                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                placeholder="0000 0000 0000 0000" data-slots="0" data-accept="\d" size="19" required />
              <i className=" left-2 top-[14px] text-gray-400 text-sm fa fa-credit-card"></i>
            </div>
            <div className="mt-8 flex gap-5 ">
              <div className="input_text w-full">
                <span className=" left-0 text-sm -top-4">Expiración</span>
                <input
                  id="fechaexpiracion"
                  name="fechaexpiracion"
                  type="text"
                  value={values.fechaexpiracion}
                  onChange={handleChange}
                  className="h-12 pl-0 outline-none focus:border-blue-900 border-b"
                  placeholder="mm/yyyy" data-slots="my" required/>
                <i className=" left-2 top-4 text-gray-400 fa fa-calendar-o"></i>
              </div>
              <div className="input_text w-full">
                <span className=" left-0 text-sm -top-4">CVV</span>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  value={values.cvv}
                  onChange={handleChange}
                  className="h-12 pl-0 pr-3 outline-none px-1 focus:border-blue-900 transition-all w-full border-b "
                  placeholder="000" data-slots="0" size="3" pattern="[0-9]{3}" required/>
                <i className=" left-2 top-4 text-gray-400 fa fa-lock"></i>
              </div>
            </div>
            <p className="text-lg text-center mt-4 text-gray-600 font-semibold">Cantidad a pagar: S./{precioFinal}</p>
            <div className="flex justify-center mt-4">
              <button className="outline-none pay h-12 bg-red-500 text-white mb-3 hover:bg-red-600 rounded-lg w-1/2 
              cursor-pointer transition-all" type="submit">Pagar</button>
            </div>
          </div>
        </div>
      </form>


    </div>
  );
}

export default Pago;
