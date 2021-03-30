import React from 'react'
import { useContext } from 'react'
import { ProductsContext } from '../components/ProductsContext'
import { CartContext } from './CartContext';


export const Products = () => {

    const { products } = useContext(ProductsContext);
    //console.log(products);

    //const data = useContext(CartContext);
    //console.log(data);

    const {dispatch} = useContext(CartContext);
    
    return(
        <>
        {products.length !== 0 && <h1>Shoes</h1>}
        <div className='products-container'>
            {products.length == 0 && <div>no products to display</div>}
            {products.map(product => (
                <div className='product-card' key={product.ProductID}>
                    <div className='product-img'>
                        <img src={product.ProductImg} alt="not found" />
                    </div>
                    <div className='product-name'>
                        {product.ProductName}
                    </div>
                    <div className='product-description'>
                        {product.ProductDesc}
                    </div>
                    <div className='product-price'>
                        THB {product.ProductPrice}.00
                    </div>
                    <button className='addcart-btn' onClick = {()=>{dispatch({type: 'ADD_TO_CART', id: product.ProductID, product})}}>ADD TO CART</button>
                </div>
            ))}
        </div>
        </>
    )
}