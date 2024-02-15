import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
       // used in func, so added as dependencies
    }, [cart.shippingAddress.address, 
        cart.paymentMethod, 
        navigate]
    );

    return (
        <div>PlaceOrderPage</div>
    );
};

export default PlaceOrderPage;