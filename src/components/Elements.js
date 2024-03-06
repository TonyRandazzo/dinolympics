import React, { useState } from 'react';
import { useCart } from './CartContext';

const Elements = () => {
  const { addToCart } = useCart();
  const products = [
    { name: 'Prodotto 1', description: 'Descrizione del prodotto 1.', price: 10, img: "https://cdn3.vectorstock.com/i/1000x1000/10/17/cowboy-hat-pixel-art-on-white-background-vector-46981017.jpg", available: true },
    { name: 'Prodotto 2', description: 'Descrizione del prodotto 2', price: 5, img: "https://c8.alamy.com/comp/2BXG6W2/vector-pixel-art-cap-isolated-2BXG6W2.jpg", available: true },
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

    return (
            <div className='shop'>
                <div className='card'>
                    <ul>
                        {products.map((product) => (
                            <li key={product.name}>
                                <div className='prodotto' style={{ backgroundImage: `url(${product.img})` }}></div>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <h3>Price: ${product.price}</h3>
                                <button onClick={() => addToCartHandler(product, quantities[product.name])}>
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default Elements;