import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productApiSlice';

const ProductListPage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    console.log(products);

    return (
        <div>ProductListPage</div>
    );
};

export default ProductListPage;