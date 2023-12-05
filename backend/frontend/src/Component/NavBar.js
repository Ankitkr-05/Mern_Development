import React from 'react';
import { NavLink } from 'react-router-dom';
import { initialState, reducer } from './ReducerFunc';
import { useContext } from 'react';
import { ContextData } from "../App";

// For not refreshing page: use 'NavLink' tag instead of anchor 
// and 'to' attribute instead of 'to'

const NavBar = () => {
    // 5.vi
    const {stateVal, dispatch} = useContext(ContextData);

    console.log("Value of state is::", stateVal)
    return (
        <>
            <nav>
                <ul className='nav-main-content'>
                    <li className='nav-menu-icon'>&#9776;</li>
                    {/* <li className='nav-sub-left'><NavLink className='nav-item-content'>Logo</NavLink></li> */}
                    <li className='nav-sub-left'><NavLink className='nav-item-content' to="/">Home</NavLink></li>
                    <li className='nav-sub-left'><NavLink className='nav-item-content' to="/profile">Profile</NavLink></li>
                    <li className='nav-sub-left'><NavLink className='nav-item-content' to="/contact">Contact</NavLink></li>
                    <li className='nav-sub-left'><NavLink className='nav-item-content' to="/about">About</NavLink></li>
                    {(stateVal)? 
                        <li className='nav-sub-right'><NavLink className='nav-item-content' to="/logout">Logout</NavLink></li>
                    :
                        <>
                            <li className='nav-sub-right'><NavLink className='nav-item-content' to="/registration">Registration</NavLink></li>
                            <li className='nav-sub-right'><NavLink className='nav-item-content' to="/login">Login</NavLink></li>
                        </>
                    }            
                </ul>
            </nav>
        </>
    );
};

export default NavBar;