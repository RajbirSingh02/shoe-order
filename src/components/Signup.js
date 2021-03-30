import React from 'react'
import { useState, useHistory } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom'

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


export const Signup = (props) => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    

    // signup
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            firestore.collection('RegisteredUsers').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Sign Up</h1>
                    <form autoComplete="off" className='form-group' onSubmit={signup}>
                        <label htmlFor="Name">Name</label>
                        <br />
                        <input type="text" className='form-control' required 
                        onChange ={(e) => setName(e.target.value)} value={name} />
                        <br />
                        <label htmlFor="Email">Email</label>
                        <br />
                        <input type="email" className='form-control' required 
                        onChange ={(e) => setEmail(e.target.value)} value ={email} />
                        <br />
                        <label htmlFor="Password">Password</label>
                        <br />
                        <input type="password" className='form-control' required 
                        onChange ={(e) => setPassword(e.target.value)} value ={password} />
                        <br />
                        <button type="submit" className='btn btn-success btn-md mybtn'>REGISTER</button>
                    </form>
                    {error && <div className='error-msg'>{error}</div>}
                    <br />
                    <span>Already have an account? Login
                        <Link to="login"> Here</Link>
                    </span>
                </Col>
            </Row>
        </Container>
    )
}