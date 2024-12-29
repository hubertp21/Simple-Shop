import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        axios.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, []);

    const fetchProductsByCategory = (category) => {
        setSelectedCategory(category);
        axios.get(`/products/category/${category}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    };

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div>
            <h1>Simple Shop</h1>

            {/* Retractable Panel */}
            <div>
                <button onClick={togglePanel}>
                    {isPanelOpen ? 'Hide Categories' : 'Show Categories'}
                </button>
                {isPanelOpen && (
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index} onClick={() => fetchProductsByCategory(category)} style={{ cursor: 'pointer', color: 'blue' }}>
                                {category}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Product List */}
            <div>
                {selectedCategory && <h2>Products in {selectedCategory}</h2>}
                <ul>
                    {products.map(product => (
                        <li key={product._id}>
                            {product.name} - ${product.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;
