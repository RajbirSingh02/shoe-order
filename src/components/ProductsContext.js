import React, {createContext} from 'react';

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


export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component{
    state = {
        products:[]
    }

    componentDidMount(){
        const prevproducts = this.state.products;
        firestore.collection('Products').onSnapshot(snapshot=>{
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    prevproducts.push({
                        ProductID: change.doc.id,
                        ProductName:change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                        ProductDesc: change.doc.data().ProductDesc,
                    })
                }
                this.setState({
                    products: prevproducts
                })
            })
        })
    }
    render(){
        return(
            <ProductsContext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}