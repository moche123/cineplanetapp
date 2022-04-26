import { Close } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ({ showMenu, active, isUserSignedIn,setIsUserSignedIn, modeLogin, setModeLogin }) => {
  return (
    <ul className={active ? 'h-full pt-20 pb-20 flex-col flex items-center fixed inset-0 uppercase bg-blue-500 backdrop-blur-lg gap-8 justify-center md:hidden z-40' : 'hidden'}>
      <Close onClick={showMenu} className='cursor-pointer' />
      {
        !isUserSignedIn ? null : <li> {JSON.parse(localStorage.getItem('user')).displayName} </li>


      }
      <li onClick={showMenu}><Link to='/'>Home</Link></li>
      {/* <li><Link to='/'>Home</Link></li> */}
      {
        isUserSignedIn ? <li> onClick={showMenu}<Link to='/dulceria'>Dulcería</Link></li> : <li onClick={showMenu}><Link to='/login'>Dulcería</Link></li>


      }



      {
        isUserSignedIn ? <li onClick={showMenu}><Link to='/login' onClick={() => {
          localStorage.setItem('isUserSignedIn', false)
          setIsUserSignedIn(false)
          localStorage.removeItem('user')
          localStorage.setItem('saludo', false)
        }}>Salir</Link></li> : <li onClick={showMenu}><Link to='/login' onClick={() => {
          localStorage.setItem('isUserSignedIn', false)
          setIsUserSignedIn(false)
          localStorage.removeItem('user')
          localStorage.setItem('saludo', false)
          setModeLogin('nothing')
        }}>Login</Link></li>


      }


    </ul>
  );
};

export default MenuItems;