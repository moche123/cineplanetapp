import { Close } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ({showMenu,active,isUserSignedIn}) => {
  return (
                <ul className={active ? 'h-full pt-20 pb-20 flex-col flex items-center fixed inset-0 uppercase bg-blue-500 backdrop-blur-lg gap-8 justify-center md:hidden z-40' : 'hidden'}>
                    <Close onClick={showMenu} className='cursor-pointer'/>
                    {
                        !isUserSignedIn ? <li><Link to='/login'>Login</Link></li> : <li> {JSON.parse(localStorage.getItem('user')).displayName} </li>


                    }
                    <li><Link to='/'>Home</Link></li>
                    {/* <li><Link to='/'>Home</Link></li> */}
                    {
                        isUserSignedIn ? <li><Link to='/dulceria'>Dulcería</Link></li> : <li><Link to='/login'>Dulcería</Link></li>


                    }

                 

                    {
                        isUserSignedIn ? <li><Link to='/login'>Salir</Link></li> : null


                    }
                  
                </ul>
  );
};

export default MenuItems;