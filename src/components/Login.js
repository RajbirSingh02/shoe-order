import React from 'react'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

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

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Login</h2>
                    <br />
                    <form autoComplete="off" className='form-group' onSubmit={login}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className='form-control' required
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" className='form-control' required
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        <br />
                        <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
                    </form>
                    {error && <span className='error-msg'>{error}</span>}
                    <br />
                    <span>Don't have an account? Register
            <Link to="signup"> Here</Link>
                    </span>
                </Col>
            </Row>
        </Container>
    )
}