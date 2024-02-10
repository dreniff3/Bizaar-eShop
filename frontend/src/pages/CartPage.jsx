import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    Row, Col, ListGroup, Image, Form, Button, Card 
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // access cartSliceReducer by calling store 'cart' reducer
    const cart = useSelector((state) => state.cart);
    // destructure state to get cart properties
    const { cartItems } = cart;

    return (
        <Row>
            <Col md={8}>
                <h1 style={{marginBottom: '20px'}}>
                    Shopping Cart
                </h1>
                {/* cartItems is an array of items in the cart */}
                { cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        { cartItems.map((item) => (
                            <ListGroup.Item key={ item._id }>
                                <Row>
                                    <Col md={2}>
                                        <Image 
                                            src={ item.image } 
                                            alt={ item.name } 
                                            fluid 
                                            rounded 
                                        />
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) }
            </Col>
        </Row>
    );
};

export default CartPage;