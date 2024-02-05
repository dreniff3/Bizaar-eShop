import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const imgStyles = {
        width: "100%",
        height: "200px",
        objectFit: "contain",
    };

    return (
        <Card className="my-3 p-3 rounded">

            <Link to={`/product/${product._id}`}>
            <Card.Img className="card-img-top" src={product.image} style={imgStyles}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>

        </Card>
    )
};

export default Product;