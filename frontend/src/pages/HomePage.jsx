import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            // proxy in package.json fills in route prefix
            const { data } = await axios.get("/api/products");
            console.log(data);
            setProducts(data);
        };

        fetchProducts();
    }, []); // run only once, when component mounts

    console.log(products);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => {
                    return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                    );
                })}
            </Row>
        </>
    )
};

export default HomePage;