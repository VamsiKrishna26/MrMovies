import React, { useState } from 'react';
import './Header.styles.scss';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.util';
import { signInWithGoogle } from '../../firebase/firebase.util';
import { connect } from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { AiOutlineBars,AiOutlineCloseCircle } from "react-icons/ai";

const Header=(props)=>{
    const{currentUser}=props;
    const[openMenu,setOpenMenu]=useState(false);

    return(
        <div>
            <div className="header">
            <div>
            <Link to="/" className="heading">
                <p>Mr. Movies</p>
            </Link>
            </div>
            <div className="options">
                <Link to="/sortMoviesPage" className="option"><b>Sort and Filter Movies</b></Link>
                <Link to="/genrePage" className="option">Genres</Link>
                <Link to="/yearPage" className="option">Years</Link>
                <Link to="/franchisesPage" className="option">Franchises</Link>
                <Link to="/topMoviesPage" className="option">Top Movies</Link>
                {
                    currentUser?
                    <Link to="/wishlistPage" className="option">Wishlist</Link>:
                    <div></div>
                }
                {
                currentUser?
                <Button variant="danger" onClick={()=>{auth.signOut()}}>SIGN OUT</Button>
                :
                <Button variant="primary" onClick={signInWithGoogle} >Google Sign-in</Button>
                }
            </div>
            <div className='menu-options' onClick={()=>{setOpenMenu(!openMenu);;window.scrollTo(0,0);}}>
                {openMenu?<AiOutlineCloseCircle className='option-menu'/>:<AiOutlineBars className='option-menu'/>}
            </div>
        </div>
        {
            openMenu?
            <div className='nav-menu' onClick={()=>{setOpenMenu(!openMenu)}}>
                <Link to="/sortMoviesPage" className="navmenu-option"><b>Sort and Filter Movies</b></Link>
                <Link to="/genrePage" className='navmenu-option'>Genres</Link>
                <Link to="/yearPage" className='navmenu-option'>Years</Link>
                <Link to="/franchisesPage" className='navmenu-option'>Franchises</Link>
                <Link to="/topMoviesPage" className='navmenu-option'>Top Movies</Link>
                {
                    currentUser?
                    <Link to="/wishlistPage" className='navmenu-option'>Wishlist</Link>:
                    <div></div>
                }
                <div className='signin-button'>
                {
                currentUser?
                <Button variant="danger"  onClick={()=>{auth.signOut()}}>SIGN OUT</Button>
                :
                <Button variant="primary" onClick={signInWithGoogle} >Google Sign-in</Button>
                }
                </div>
            </div>:null
        }
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser
});

export default connect(mapStateToProps)(Header);