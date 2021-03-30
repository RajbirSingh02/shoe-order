import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.svg'
import { useHistory } from 'react-router-dom'
import { BsBagFill } from 'react-icons/bs'
import { CartContext } from './CartContext'
// Firebase
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseUrl: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
    });
}
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();


export const Navbar = ({ user }) => {
    const { totalQty } = useContext(CartContext);
    const history = useHistory();
    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }

    return (
        <div className='navbox'>
            <div className='leftside'>
                <Link to ='/'><img src={logo} alt="" /></Link>
            </div>
            {!user && <div className='rightside'>
                <Link to='/signup' className='navlinks'>SIGN UP</Link>
                <Link to='/login' className='navlinks'>LOGIN</Link>
            </div>}
            {user && <div className='rightside'>
                <span><Link to='/' className='navlinks'>{user}</Link></span>
                <span><Link to="cartproducts" className='navlink'><BsBagFill /></Link></span>
                <div className='relative'>
                    <span className='no-of-products'>{totalQty}</span>
                </div>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}