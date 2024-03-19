import React, { useState } from 'react';
import { useCart } from './CartContext';

const Elements = () => {
    const { addToCart, purchasedItems } = useCart(); 
    const { cart } = useCart(); 
    const products = [
        { name: 'Yellow DIno', description: 'Descrizione del prodotto 1.', price: 5, img: 'yellow', available: true },
        { name: 'Green Dino', description: 'Descrizione del prodotto 2', price: 5, img: 'green', available: true },
        { name: 'Red Dino', description: 'Descrizione del prodotto 3', price: 5, img: 'red', available: true },
    ];
    const [quantities, setQuantities] = useState({});

    const addToCartHandler = (product, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity)) {
            addToCart(product, parsedQuantity);
            setQuantities({ ...quantities, [product.name]: 1 });
        } else {
            addToCart(product, 1);
            setQuantities({ ...quantities, [product.name]: 1 });
        }
    }

    const isProductInCart = (productName) => {
        return cart.some(item => item.name === productName) || purchasedItems.some(item => item.name === productName); 
    }

    return (
        <div className='shop'>
            <div className='card'>
                <ul>
                    {products.map((product) => (
                        <li key={product.name}>
                            <div className={`prodotto ${product.img}`} style={{ imageRendering: 'pixelated', animation: 'play-sprite 0.7s steps(1) infinite', backgroundColor: 'white' }}></div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <h3>Price: ${product.price}</h3>
                            {!isProductInCart(product.name) && (
                                <button onClick={() => addToCartHandler(product, quantities[product.name])}>
                                    Add to Cart
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Elements;
