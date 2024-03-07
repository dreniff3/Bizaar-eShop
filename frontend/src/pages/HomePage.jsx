import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';
import { useGetProductsQuery } from '../slices/productApiSlice.js';

const HomePage = () => {
    const { keyword, pageNumber } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

    return (
        <>
            { keyword && <Link to='/' className='btn btn-light mb-2'>Go Back</Link> }
            { isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    { error?.data?.message || error.error }
                </Message>
            ) : (<>
                <h1>Latest Products</h1>
                <Row>
                    {data.products.map((product) => {
                        return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                        );
                    })}
                </Row>
                <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword ? keyword : ''}
                />
            </>) }
        </>
    )
};

export default HomePage;