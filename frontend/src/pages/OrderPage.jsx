import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailQuery } from '../slices/ordersApiSlice';

const OrderPage = () => {
    return (
        <div>OrderPage</div>
    );
};

export default OrderPage;