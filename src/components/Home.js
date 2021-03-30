import React from 'react'
import {useEffect} from 'react'
import {Navbar} from '../components/Navbar'
import {Products} from '../components/Products'
import {useHistory} from 'react-router-dom'
import '../css/Home.css'

// Firebase
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


export const Home = ({user}) => {
    const history = useHistory();
    useEffect(()=> {
        auth.onAuthStateChanged(user=>{
            if(!user){
                history.push('/login');
            }
        })
    })
    return(
        <div className='wrapper'>
            <Navbar user = {user} />
            <Products />
        </div>
    )
}