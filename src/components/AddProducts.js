import React from 'react'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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


export const AddProducts = () => {
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [productDesc, setProductDesc] = useState();
    const [error, setError] = useState();

    const types = ['image/png', 'image/jpeg']

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type png or jpeg');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    firestore.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url,
                        ProductDesc: productDesc
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductImg('');
                        setProductDesc('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2>ADD PRODUCTS</h2>
                    <hr />
                    <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                        <label htmlFor="product-name">Product Name</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductName(e.target.value)} value={productName} />
                        <br />
                        <label htmlFor="product-price">Product Price</label>
                        <input type="number" className='form-control' required
                            onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                        <br />
                        <label htmlFor="product-img">Product Image</label>
                        <input type="file" className='form-control' id="file" required
                            onChange={productImgHandler} />
                        <br />
                        <label htmlFor="product-description">Product Description</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductDesc(e.target.value)} value={productDesc} />
                        <br />
                        <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
                    </form>
                    {error && <span className='error-msg'>{error}</span>}
                </Col>
            </Row>
        </Container>
    )
}