import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Home } from '../src/components/Home'
import { AddProducts } from './components/AddProducts';
import { ProductsContextProvider } from './components/ProductsContext';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { CartContextProvider } from './components/CartContext';
import { Cart } from './components/Cart'

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
import { Checkout } from './components/Checkout';



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

export class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        firestore.collection('RegisteredUsers').doc(user.uid).get().then(snapshot => {
          this.setState({
            user: snapshot.data().Name
          })
        })
      }
      else {
        this.setState({
          user: null
        })
      }
    })
  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={() => <Home user={this.state.user} />} />
              <Route path='/addproducts' component={AddProducts} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/cartproducts' component={()=> <Cart user={this.state.user}/>} />
              <Route path='/checkout' component = {() => <Checkout user={this.state.user}/>} />
            </Switch>
          </Router>
        </CartContextProvider>
      </ProductsContextProvider>
    )
  }
}


export default App