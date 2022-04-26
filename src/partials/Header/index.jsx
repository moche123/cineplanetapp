import { MenuOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
import cineplanetLogo from '../../assets/cineplanet_logo.svg';


const Header = ({ isUserSignedIn,setIsUserSignedIn,modeLogin,setModeLogin }) => {

    const [active, setActive] = useState();

    const showMenu = () => {
        setActive(!active)
    }


    return (
        <div className='fixed w-full text-white text-xl flex justify-between p-2 items-center bg-yellow-400'>

            <div className='flex items-center'>
                <img src={cineplanetLogo} className="mr-3 h-6 sm:h-9" alt="" />
                <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white tracking-wide	">ECOMMERCE CP</span>
                {
                    !isUserSignedIn ? null : <li> {JSON.parse(localStorage.getItem('user')).displayName} </li>


                }

            </div>

            <nav>

                <div className='absolute right-6 md:hidden top-3 scale-120'>
                    <MenuOutlined onClick={showMenu} className='scale-120 cursor-pointer' />
                </div>

                <ul className='hidden md:flex gap-8 p-6 uppercase'>
                    <li ><Link to='/'>Home</Link></li>
                    {/* <li><Link to='/'>Home</Link></li> */}
                    {
                        isUserSignedIn ? <li><Link to='/dulceria'>Dulcería</Link></li> : <li><Link to='/login'>Dulcería</Link></li>


                    }



                    {
                        isUserSignedIn ? <li><Link to='/login' onClick={()=> {
                            localStorage.setItem('isUserSignedIn',false)
                            setIsUserSignedIn(false)
                            localStorage.removeItem('user')
                            localStorage.setItem('saludo',false)
                        }}>Salir</Link></li> : <li><Link to='/login' onClick={()=> {
                            localStorage.setItem('isUserSignedIn',false)
                            setIsUserSignedIn(false)
                            localStorage.removeItem('user')
                            localStorage.setItem('saludo',false)
                            setModeLogin('nothing')
                        }}>Login</Link></li>


                    }


                </ul>

                <MenuItems showMenu={showMenu} active={active} setIsUserSignedIn={setIsUserSignedIn} isUserSignedIn={isUserSignedIn} modeLogin={modeLogin} setModeLogin={setModeLogin} />

            </nav>

        </div>
    );
};

export default Header;