import React, { useState } from 'react';
import { useCart } from './CartContext';

const Elements = () => {
    const { addToCart, purchasedItems } = useCart(); 
    const { cart } = useCart(); 
    const products = [
        { name: 'Gold Dino', description: "He's yellow and loves to play.", price: 5, img: 'yellow', available: true },
        { name: 'Green Dino', description: "He's green and sleepy.", price: 5, img: 'green', available: true },
        { name: 'Red Dino', description: "He's red and very competitive", price: 5, img: 'red', available: true },
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
        <div className='shop max-md:flex-col'>
            <div className='card max-lg:w-1/2 h-1/2 text-sm max-md:flex-col'>
                <ul className='max-md:flex-col'>
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
