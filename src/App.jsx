import './App.css';
import { Routes, Route  } from "react-router-dom";
//Components
import Home from './pages/Home';
import Dulceria from './pages/Dulceria';
import Pago from './pages/Pago';
import Login from './pages/Login';
import Header from './partials/Header';
import React, { useState } from "react";

function App() {
  const [isUserSignedIn,setIsUserSignedIn] = React.useState(localStorage.getItem('isUserSignedIn') == 'true' ? true : false);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [modeLogin,setModeLogin] = useState('nothing');

  React.useEffect(()=>{
    const onChange = (change) => {
      if (change.key === "isUserSignedIn") {
        console.log("Hubo cambios");
        if(localStorage.getItem('isUserSignedIn') == 'true'){
          setIsUserSignedIn(true)
        }else{
          setIsUserSignedIn(false)
        }
      }else{
        if(change.key === "modeLogin"){
          setModeLogin(change.newValue)
        }
      }
    };

    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener("storage", onChange);
    };

  },[]);


  return (
    <div>

      <Header isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn}
      modeLogin={modeLogin} setModeLogin={setModeLogin} />
      <Routes>

        <Route path="/" element={<Home isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} 
                                          modeLogin={modeLogin} setModeLogin={setModeLogin} />} />
        <Route path="/dulceria" element={<Dulceria  isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} 
                                              precioFinal={precioFinal}  setPrecioFinal={setPrecioFinal} 
                                              modeLogin={modeLogin} setModeLogin={setModeLogin}/>} />
        <Route path="/pago" element={<Pago isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn}
                                        precioFinal={precioFinal}  setPrecioFinal={setPrecioFinal}/>} />
        <Route path="*" element={<NoRouteFound />} />
      </Routes>
    </div>
  );


}

function NoRouteFound(){
  return <div>
   
    No route found
    </div>
}


export default App;
